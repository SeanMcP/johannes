const { checkThemeVariable } = require('./styles')

const theme = {
    variables: {
        'primary-color': 'orange'
    }
}

test('checkThemeVariable', () => {
    const validVariable = '@primary-color'
    expect(checkThemeVariable(validVariable, theme)).toMatch(
        theme.variables['primary-color']
    )

    const invalidVariable = '@invalid-variable'
    expect(() => checkThemeVariable(invalidVariable, theme)).toThrowError()

    const validValue = 'blue'
    expect(checkThemeVariable(validValue, theme)).toMatch(validValue)
})
