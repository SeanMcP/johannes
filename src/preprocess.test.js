const { preprocessData } = require('./preprocess')

global.data = {
    content: [
        {
            type: 'type',
            styles: {
                'background-color': 'white',
                color: '@primary-color'
            }
        },
        {
            type: 'type',
            styles: {
                'background-color': 'white',
            }
        }
    ],
    theme: {
        variables: {
            'primary-color': 'orange'
        } 
    }
}

test('preprocessData', () => {
    const output = preprocessData()
    expect(typeof output).toMatch('string')

    const expected = `
.--background-color--white { background-color: white; }
.--color--@primary-color { color: orange; }`

    expect(output).toMatch(expected)
})
