const cypress = require('cypress')


function createFlowId() {

    const now = new Date()

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `flow-${day}-${month}-${year}_${hours}-${minutes}-${seconds}`
}


async function executeStep(step, flowId) {

    console.log('\n========================================')
    console.log(`▶ ${step.name}`)
    console.log(`   ID: ${step.id}`)
    console.log('========================================\n')


    // ==================================================
    // PASTAS DE EVIDÊNCIA
    // ==================================================

    const screenshotsFolder =
        `cypress/evidence flow/${flowId}/${step.id}/photos`

    const videosFolder =
        `cypress/evidence flow/${flowId}/${step.id}/videos`


    // ==================================================
    // EXECUTA O SPEC INTEIRO
    // ==================================================

    let results

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

        console.error('\n❌ Erro ao executar Cypress.')
        console.error(error)

        return false
    }


    // ==================================================
    // VERIFICA SE O CYPRESS CONSEGUIU EXECUTAR O SPEC
    // ==================================================

    if (results.failures) {

        console.error('\n❌ O Cypress não conseguiu executar o spec.')
        console.error(results.message)

        return false
    }


    // ==================================================
    // PEGA TODOS OS TESTES INDIVIDUAIS
    // ==================================================

    const tests = results.runs
        .flatMap(run => run.tests || [])


    console.log('\n📋 RESULTADO DOS TESTES\n')


    for (const test of tests) {

        const testName = test.title[test.title.length - 1]

        console.log(
            `   ${test.state === 'passed' ? '✅' : '❌'} ${testName} → ${test.state}`
        )
    }


    // ==================================================
    // VERIFICA AS CONDITIONS
    // ==================================================

    console.log('\n🔎 VERIFICANDO CONDITIONS\n')


    let conditionsPassed = true


    for (const condition of step.conditions) {

        const foundTest = tests.find(test => {

            const testName = test.title[test.title.length - 1]

            return testName === condition.test
        })


        if (!foundTest) {

            console.error('❌ TESTE DA CONDITION NÃO ENCONTRADO')
            console.error(`   Procurado: ${condition.test}`)

            conditionsPassed = false

            continue
        }


        const actual = foundTest.state
        const expected = condition.expected


        console.log(`   Teste:    ${condition.test}`)
        console.log(`   Esperado: ${expected}`)
        console.log(`   Obtido:   ${actual}`)


        if (actual === expected) {

            console.log('   ✅ Condition aprovada\n')

        } else {

            console.error('   ❌ Condition reprovada\n')

            conditionsPassed = false
        }
    }


    // ==================================================
    // DECISÃO DO STEP
    // ==================================================

    if (conditionsPassed) {

        console.log(`✅ ${step.name} APROVADO`)
        console.log('➡️ Próximo fluxo será executado.\n')

        return true
    }


    console.error(`❌ ${step.name} REPROVADO`)
    console.error('⛔ Fluxo interrompido.\n')

    return false
}


async function executeFlow(flow) {

    // ==================================================
    // CRIA ID ÚNICO DA EXECUÇÃO
    // ==================================================

    const flowId = createFlowId()


    console.log('\n')
    console.log('########################################')
    console.log(`# ${flow.name}`)
    console.log(`📁 Evidências: ${flowId}`)
    console.log('########################################')


    // ==================================================
    // EXECUTA OS STEPS
    // ==================================================

    for (const step of flow.steps) {

        const passed = await executeStep(step, flowId)


        if (!passed) {

            console.error('\n========================================')
            console.error('⛔ FLOW INTERROMPIDO')
            console.error(`   Etapa: ${step.name}`)
            console.error('========================================\n')

            return false
        }
    }


    console.log('\n========================================')
    console.log('🎉 FLOW COMPLETO APROVADO')
    console.log('========================================\n')

    return true
}


module.exports = {
    executeStep,
    executeFlow
}