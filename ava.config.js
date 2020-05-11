export default {
    extensions: ['ts'],
    files: ['**/*.test.ts'],
    require: ['ts-node/register'],
    environmentVariables: {
        TS_NODE_COMPILER_OPTIONS: '{"module": "commonjs"}',
    },
    verbose: true,
    watch: true,
}
