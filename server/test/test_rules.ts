import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as firebase from '@firebase/testing'

chai.use(chaiAsPromised)
const expect = chai.expect

describe('Generic rule', () => {
  let app: ReturnType<typeof firebase.initializeTestApp>

  before(() => {
    app = firebase.initializeTestApp({
      auth: {
        email: 'alice@example.com',
        uid: 'userId',
      },
      projectId: 'my-test-project',
    })
  })
  after(() => {
    Promise.all(firebase.apps().map(app => app.delete()))
  })

  it('should not allow to read an unused collection', () =>
    expect(app.firestore().collection('unknown').get()).to.eventually.be.rejected).
    timeout(3000)

  it('should not allow to write to an unused collection', () =>
    expect(app.firestore().collection('unknown').doc('newDoc').set({
      hello: 'world',
    })).to.eventually.be.rejected)
})

describe('User rule', () => {
  let app: ReturnType<typeof firebase.initializeTestApp>

  before(() => {
    app = firebase.initializeTestApp({
      auth: {
        email: 'alice@example.com',
        uid: 'userId',
      },
      projectId: 'my-test-project',
    })
  })
  after(() => {
    Promise.all(firebase.apps().map(app => app.delete()))
  })

  it('should not allow to create a user with another ID', () =>
    expect(app.firestore().collection('users').doc('otherId').set({
      email: 'other@example.com',
    })).to.eventually.be.rejected)

  it('should allow to create a user with the auth ID', () =>
    expect(app.firestore().collection('users').doc('userId').set({
      email: 'email@example.com',
    })).to.eventually.be.fulfilled)
})
