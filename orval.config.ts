module.exports = {
  snippet: {
    output: {
      target: './src/lib/api/snippet.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/lib/api/custom-instance.ts',
          name: 'customInstance'
        }
      }
    },
    input: './docs/snippet.yaml'
  }
};
