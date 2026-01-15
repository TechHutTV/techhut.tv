import { mdxAnnotations } from 'mdx-annotations'

/**
 * Custom recma plugin to extract MDX exports into getStaticProps
 * Converts: export const title = "..."
 * To: const title = "..." + creates getStaticProps that returns {props: {title, ...}}
 */
function recmaMdxStaticProps() {
  return (tree) => {
    const exports = []

    // Find all export const declarations and convert them to regular const
    tree.body = tree.body.map((node) => {
      if (node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'VariableDeclaration') {
        // Extract variable names from this export
        node.declaration.declarations.forEach((decl) => {
          if (decl.id?.name) {
            exports.push(decl.id.name)
          }
        })
        // Return just the declaration (removes 'export')
        return node.declaration
      }
      return node
    })

    // Only create getStaticProps if we found exports
    if (exports.length === 0) {
      return
    }

    // Create getStaticProps function that returns all exports as props
    // Uses JSON.parse(JSON.stringify()) to clean undefined values
    // export const getStaticProps = () => ({ props: JSON.parse(JSON.stringify({ title, cover, ... })) })
    tree.body.push({
      type: 'ExportNamedDeclaration',
      declaration: {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'getStaticProps'
            },
            init: {
              type: 'ArrowFunctionExpression',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ReturnStatement',
                    argument: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'props'
                          },
                          value: {
                            type: 'CallExpression',
                            callee: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Identifier',
                                name: 'JSON'
                              },
                              property: {
                                type: 'Identifier',
                                name: 'parse'
                              }
                            },
                            arguments: [
                              {
                                type: 'CallExpression',
                                callee: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Identifier',
                                    name: 'JSON'
                                  },
                                  property: {
                                    type: 'Identifier',
                                    name: 'stringify'
                                  }
                                },
                                arguments: [
                                  {
                                    type: 'ObjectExpression',
                                    properties: exports.map((name) => ({
                                      type: 'Property',
                                      key: {
                                        type: 'Identifier',
                                        name: name
                                      },
                                      value: {
                                        type: 'Identifier',
                                        name: name
                                      },
                                      kind: 'init',
                                      shorthand: true
                                    }))
                                  }
                                ]
                              }
                            ]
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    })
  }
}

export const recmaPlugins = [
  mdxAnnotations.recma,
  recmaMdxStaticProps,
]
