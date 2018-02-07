import 'react-native'
import React from 'react'
import App from '../App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

describe('<App />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('works, hopefully', () => {
    expect(true).toEqual(true)
  })
  it('should have <Provider>', () => { })
  it('should have <StackNavigator>', () => { })
})

describe('<Login />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should have <Chat /> tag', () => { })
  it('should have login button', () => { })
  it('should link to <Chat /> screen', () => { }) // simulate
})

describe('<Chat />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Chat />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should have header', () => { })
  it('should have form input', () => { })
  it('should can receive text input', () => { })
  it('should can post message', () => { })
  it('should can display new message', () => { })
  it('should can display older messages', () => { })
  it('should can display article options', () => { })
  it('should can select article', () => { })
  it('should can remove article options', () => { })
})

describe('<ReadingList />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ReadingList />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should have <ReadingItem /> screen', () => { })
  it('should have <Overview /> screen', () => { })
})

describe('<Overview />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Overview />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
