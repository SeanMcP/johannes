const {
    camelToKabob,
    capitalize,
    getClass,
    getId,
    ifDev,
    logProcess
} = require('./utils')

test('camelToKabob', () => {
    expect(camelToKabob('testExample')).toMatch('test-example')
})

test('capitalize', () => {
    expect(capitalize('test')).toMatch('Test')
})

test('logProcess', () => {
    const mockFn = jest.fn()
    logProcess('message', mockFn)
    expect(mockFn).toHaveBeenCalled()
})

describe('getClass', () => {
    const className = 'className'
    const defaultValue = 'defaultValue';
    test('returns class with true condition', () => {
        expect(getClass(true, className)).toMatch(className)
    })
    test('returns default with false condition', () => {
        expect(getClass(false, className, defaultValue)).toMatch(
            defaultValue
        )
    })
})

test('getId', () => {
    const output1 = getId()
    expect(output1.length).toBe(5)
    
    const tag = 'tag'
    const output2 = getId(tag)
    expect(output2.length).toBe(9)
})

describe('ifDev', () => {
    test('calls back in dev', () => {
        process.env.NODE_ENV = 'development'
        const mockFn = jest.fn()
        ifDev(mockFn)
        expect(mockFn).toHaveBeenCalled()
    })

    test('does not call back in prod', () => {
        process.env.NODE_ENV = 'production'
        const mockFn = jest.fn()
        ifDev(mockFn)
        expect(mockFn).not.toHaveBeenCalled()
    })
})