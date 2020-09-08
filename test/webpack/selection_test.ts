import {expect} from 'chai'
import {makeCertifiedSteps} from 'store/selections'

describe('makeCertifiedSteps', () => {

  it('should show if a step is completed', () => {
    const identifications: readonly bayes.maVoie.PartnerIdentification[] = [
      {
        partnerId: 'chance',
        steps: [{
          projectId: '0',
          stepId: 'definition',
          validatedAt: '2020-09-08',
        }],
        userPartnerId: 'userChanceId',
      },
    ]
    const certifiedSteps = makeCertifiedSteps(identifications, '0')
    expect(certifiedSteps).to.be.ok
    expect(certifiedSteps).to.have.key('definition')
    expect(certifiedSteps?.definition?.completed).to.equal('partner')
  })

  // TODO(cyrille): Add more tests.
})
