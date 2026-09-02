const { executeFlow } = require('../engine/flow-engine')
const config = require('../config/complete.config')


async function main() {

    const success = await executeFlow(config.complete)

    if (!success) {
        process.exit(1)
    }

    process.exit(0)
}


main()

