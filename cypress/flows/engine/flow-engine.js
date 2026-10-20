
const cypress = require('cypress')
const fs = require('fs')
const path = require('path')

const REPORTS_DIR = path.resolve('cypress/reports')
const HISTORY_DIR = path.join(REPORTS_DIR, 'history')

// Gera um identificador único para cada execução.
function createFlowId() {
    const now = new Date()

    const date = [
        String(now.getDate()).padStart(2, '0'),
        String(now.getMonth() + 1).padStart(2, '0'),
        now.getFullYear()
    ].join('-')

    const time = [
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0'),
        String(now.getMilliseconds()).padStart(3, '0')
    ].join('-')

    return `flow-${date}_${time}`
}

function ensureDirectories() {
    fs.mkdirSync(HISTORY_DIR, { recursive: true })
}

function summarizeTests(tests) {
    const summary = {
        total: tests.length,
        passed: 0,
        failed: 0,
        pending: 0,
        skipped: 0
    }

    for (const test of tests) {
        if (test.state === 'passed') summary.passed++
        else if (test.state === 'failed') summary.failed++
        else if (test.state === 'skipped') summary.skipped++
        else summary.pending++
    }

    return summary
}

function formatDuration(ms) {
    const seconds = Math.floor(Math.max(0, ms || 0) / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}m ${String(remainingSeconds).padStart(2, '0')}s`
}

function formatDate(value) {
    if (!value) return '—'

    const date = new Date(value)

    return Number.isNaN(date.getTime())
        ? String(value)
        : date.toLocaleString('pt-BR')
}

function escapeHtml(value) {
    return String(value ?? '—')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// Extrai os resultados dos testes executados pelo Cypress.
function collectTests(results, step) {
    const tests = []

    for (const run of results?.runs || []) {
        const spec = run.spec?.relative || step.spec

        for (const test of run.tests || []) {
            const titles = Array.isArray(test.title)
                ? test.title
                : [String(test.title || 'Teste sem título')]

            const attempts = test.attempts || []
            const lastAttempt = attempts[attempts.length - 1]

            let screenshot = null

            if (test.state === 'failed') {
                const screenshots = run.screenshots || []

                const matchingScreenshot = screenshots.find(item => {
                    if (item.testFailure) return true

                    const screenshotName =
                        `${item.screenshotName || ''} ${item.path || ''}`
                            .toLowerCase()

                    return titles.some(title =>
                        title.length > 2 &&
                        screenshotName.includes(title.toLowerCase())
                    )
                })

                if (matchingScreenshot) {
                    screenshot = matchingScreenshot.path || null
                }
            }

            const error =
                lastAttempt?.error?.message ||
                test.displayError ||
                null

            tests.push({
                step: step.name,
                stepId: step.id,
                spec,
                title: titles.filter(Boolean).join(' '),
                state: test.state || 'unknown',
                durationMs: Number(
                    lastAttempt?.duration ?? test.duration ?? 0
                ),
                error: typeof error === 'string'
                    ? error
                    : error
                        ? JSON.stringify(error)
                        : null,
                screenshot
            })
        }
    }

    return tests
}

// Gera o relatório HTML.
function renderHtml(report) {
    const summary = report.summary

    const testRows = report.tests.map(test => {
        const screenshot = test.screenshot
            ? `<code>${escapeHtml(test.screenshot)}</code>`
            : '—'

        return `
            <tr>
                <td class="${escapeHtml(test.state)}">
                    ${escapeHtml(test.state)}
                </td>
                <td>${escapeHtml(test.title)}</td>
                <td><code>${escapeHtml(test.spec)}</code></td>
                <td>${escapeHtml(formatDuration(test.durationMs))}</td>
                <td class="error">${escapeHtml(test.error)}</td>
                <td>${screenshot}</td>
            </tr>
        `
    }).join('')

    const stepRows = report.steps.map(step => `
        <tr>
            <td>${escapeHtml(step.name)}</td>
            <td><code>${escapeHtml(step.spec)}</code></td>
            <td class="${escapeHtml(step.status)}">
                ${escapeHtml(step.status)}
            </td>
            <td>${step.summary.total}</td>
            <td>${step.summary.passed}</td>
            <td>${step.summary.failed}</td>
            <td>${escapeHtml(formatDuration(step.durationMs))}</td>
        </tr>
    `).join('')

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Relatório Cypress</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            color: #202938;
            margin: 0;
            padding: 24px;
        }

        main {
            max-width: 1200px;
            margin: auto;
        }

        section {
            background: white;
            padding: 20px;
            margin: 18px 0;
            border: 1px solid #dfe3e8;
            border-radius: 10px;
        }

        .metrics {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
        }

        .metric {
            background: white;
            padding: 16px;
            border: 1px solid #dfe3e8;
            border-radius: 10px;
        }

        .metric strong {
            display: block;
            font-size: 26px;
            margin-top: 8px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: top;
        }

        th {
            background: #f8fafc;
        }

        .table-wrap {
            overflow-x: auto;
        }

        code, .error {
            overflow-wrap: anywhere;
            white-space: pre-wrap;
        }

        .passed {
            color: #087443;
        }

        .failed {
            color: #b42318;
        }

        .pending, .skipped {
            color: #b54708;
        }

        .muted {
            color: #667085;
        }

        @media (max-width: 700px) {
            body {
                padding: 12px;
            }

            .metrics {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
<main>
    <h1>Relatório de execução Cypress</h1>
    <p class="muted">Fluxo: ${escapeHtml(report.flowName)}</p>

    <section>
        <h2>Resumo dos testes</h2>
        <div class="metrics">
            <div class="metric">Total
                <strong>${summary.total}</strong>
            </div>
            <div class="metric">Aprovados
                <strong class="passed">${summary.passed}</strong>
            </div>
            <div class="metric">Reprovados
                <strong class="failed">${summary.failed}</strong>
            </div>
            <div class="metric">Pendentes
                <strong class="pending">${summary.pending}</strong>
            </div>
            <div class="metric">Ignorados
                <strong class="skipped">${summary.skipped}</strong>
            </div>
        </div>
    </section>

    <section>
        <h2>Dados da execução</h2>
        <p><strong>ID:</strong> ${escapeHtml(report.flowId)}</p>
        <p><strong>Status:</strong> ${escapeHtml(report.status)}</p>
        <p><strong>Início:</strong> ${escapeHtml(formatDate(report.startedAt))}</p>
        <p><strong>Término:</strong> ${escapeHtml(formatDate(report.endedAt))}</p>
        <p><strong>Duração:</strong> ${escapeHtml(formatDuration(report.durationMs))}</p>
        <p><strong>Mensagem:</strong> ${escapeHtml(report.message)}</p>
    </section>

    <section>
        <h2>Resultados por teste</h2>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Teste</th>
                        <th>Spec</th>
                        <th>Duração</th>
                        <th>Erro</th>
                        <th>Screenshot</th>
                    </tr>
                </thead>
                <tbody>
                    ${testRows || '<tr><td colspan="6">Nenhum teste registrado.</td></tr>'}
                </tbody>
            </table>
        </div>
    </section>

    <section>
        <h2>Etapas do fluxo</h2>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Etapa</th>
                        <th>Spec</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Aprovados</th>
                        <th>Reprovados</th>
                        <th>Duração</th>
                    </tr>
                </thead>
                <tbody>
                    ${stepRows || '<tr><td colspan="7">Nenhuma etapa executada.</td></tr>'}
                </tbody>
            </table>
        </div>
    </section>
</main>
</body>
</html>`
}

// Salva os relatórios dentro de uma pasta exclusiva por execução.
function writeReports(report) {
    ensureDirectories()

    const json = JSON.stringify(report, null, 2)
    const html = renderHtml(report)

    const executionDir = path.join(HISTORY_DIR, report.flowId)

    fs.mkdirSync(executionDir, { recursive: true })

    fs.writeFileSync(
        path.join(executionDir, 'report.json'),
        json,
        'utf8'
    )

    fs.writeFileSync(
        path.join(executionDir, 'report.html'),
        html,
        'utf8'
    )

    // Mantém também uma cópia da execução mais recente.
    fs.writeFileSync(
        path.join(REPORTS_DIR, 'latest-report.json'),
        json,
        'utf8'
    )

    fs.writeFileSync(
        path.join(REPORTS_DIR, 'latest-report.html'),
        html,
        'utf8'
    )

    console.log('\n📄 Relatórios atualizados:')
    console.log(path.join(executionDir, 'report.html'))
    console.log(path.join(executionDir, 'report.json'))
}

// Executa um spec e avalia somente as condições obrigatórias configuradas.
async function executeStep(step, flowId) {
    const startedMs = Date.now()
    const startedAt = new Date(startedMs).toISOString()

    console.log('\n========================================')
    console.log(`▶ ${step.name}`)
    console.log(`ID: ${step.id}`)
    console.log('========================================\n')

    const screenshotsFolder = path.resolve(
        `cypress/evidence flow/${flowId}/${step.id}/photos`
    )

    const videosFolder = path.resolve(
        `cypress/evidence flow/${flowId}/${step.id}/videos`
    )

    let results
    let executionError = null

    try {
        results = await cypress.run({
            spec: step.spec,
            config: {
                screenshotsFolder,
                videosFolder,
                trashAssetsBeforeRuns: false
            }
        })
    } catch (error) {
        executionError = error?.stack || error?.message || String(error)
    }

    const tests = collectTests(results, step)
    const summary = summarizeTests(tests)

    // Erros de execução do Cypress, distintos de falhas individuais de teste.
    if (!executionError && (!results || results.failures)) {
        executionError = results?.message || 'Falha ao executar o spec.'
    }

    if (!executionError && tests.length === 0) {
        executionError = 'Nenhum teste foi encontrado no resultado da execução.'
    }

    console.log('\n📋 RESULTADO DOS TESTES\n')

    for (const test of tests) {
        const icon = test.state === 'passed' ? '✅' : '❌'
        console.log(` ${icon} ${test.title} → ${test.state}`)
    }

    let conditionError = null

    // Somente as conditions do arquivo de configuração definem
    // se a etapa pode avançar para a próxima.
    if (!executionError) {
        for (const condition of step.conditions || []) {
            const foundTest = tests.find(test =>
                test.title === condition.test ||
                test.title.endsWith(condition.test)
            )

            if (!foundTest) {
                conditionError =
                    `Teste da condition não encontrado: ${condition.test}`
                break
            }

            if (foundTest.state !== condition.expected) {
                conditionError =
                    `Condition reprovada: ${condition.test}; ` +
                    `esperado ${condition.expected}, obtido ${foundTest.state}`
                break
            }
        }
    }

    // Falhas em testes não obrigatórios são registradas,
    // mas não reprovam a etapa se todas as conditions passarem.
    const passed =
        !executionError &&
        !conditionError &&
        tests.length > 0

    const endedMs = Date.now()

    const stepReport = {
        id: step.id,
        name: step.name,
        spec: step.spec,
        status: passed ? 'passed' : 'failed',
        startedAt,
        endedAt: new Date(endedMs).toISOString(),
        durationMs: endedMs - startedMs,
        summary,
        error: executionError || conditionError
    }

    if (!passed) {
        console.error(`\n❌ ${step.name} REPROVADO`)
        console.error(executionError || conditionError)
    } else {
        console.log(`\n✅ ${step.name} APROVADO`)
    }

    return {
        passed,
        report: stepReport,
        tests,
        message: executionError || conditionError || null
    }
}

// Executa as etapas do fluxo em sequência.
async function executeFlow(flow) {
    const flowId = createFlowId()
    const startedMs = Date.now()

    const report = {
        reportVersion: '1.0',
        flowId,
        flowName: flow.name || 'Fluxo sem nome',
        status: 'running',
        startedAt: new Date(startedMs).toISOString(),
        endedAt: null,
        durationMs: 0,
        summary: summarizeTests([]),
        steps: [],
        tests: [],
        message: 'Execução em andamento.'
    }

    // Cria os relatórios antes de iniciar a execução.
    writeReports(report)

    let flowPassed = true

    try {
        for (const step of flow.steps || []) {
            const result = await executeStep(step, flowId)

            report.steps.push(result.report)
            report.tests.push(...result.tests)
            report.summary = summarizeTests(report.tests)

            report.message = result.message || 'Fluxo em andamento.'
            report.durationMs = Date.now() - startedMs

            // Atualiza os relatórios após cada etapa.
            writeReports(report)

            if (!result.passed) {
                flowPassed = false

                console.error(
                    `\n⛔ FLOW INTERROMPIDO NA ETAPA: ${step.name}`
                )

                break
            }
        }
    } catch (error) {
        flowPassed = false
        report.message = error?.stack || error?.message || String(error)

        console.error('Erro inesperado no fluxo:', error)
    }

    report.status = flowPassed ? 'passed' : 'failed'
    report.endedAt = new Date().toISOString()
    report.durationMs = Date.now() - startedMs

    if (flowPassed) {
        report.message = 'Fluxo completo aprovado.'
        console.log('\n🎉 FLOW COMPLETO APROVADO')
    } else if (
        !report.message ||
        report.message === 'Fluxo em andamento.'
    ) {
        report.message = 'Fluxo interrompido por falha.'
    }

    // Garante o relatório final, mesmo se alguma etapa reprovar.
    writeReports(report)

    return flowPassed
}

module.exports = {
    executeStep,
    executeFlow
}
