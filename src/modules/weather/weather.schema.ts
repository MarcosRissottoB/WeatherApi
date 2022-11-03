const S = require('fluent-json-schema')

const queryStringJsonSchema = S.object()
  .prop('city', S.string())

export const schema = {
  querystring: queryStringJsonSchema
}
