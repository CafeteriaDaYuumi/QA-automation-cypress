const { executeFlow } = require('../engine/flow-engine')
const config = require('../config/complete.config')

async function main() {

    const success = await executeFlow(config.complete)

    // Permite que o processo finalize com o resultado correto do fluxo
    process.exitCode = success ? 0 : 1
}

main().catch(error => {

    console.error('❌ Erro inesperado ao executar o fluxo.')
    console.error(error)

    process.exitCode = 1
})

