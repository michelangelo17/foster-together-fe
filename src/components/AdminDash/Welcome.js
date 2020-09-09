import React from 'react'
import { BounceRight } from 'animate-components'
import { WelcomeDiv, Title, Name } from './WelcomeStyles'
import { useSelector } from 'react-redux'

export default function WelcomeMessage() {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <WelcomeDiv>
      <BounceRight as='div' iterations='1'>
        <Title>
          Welcome back <Name>{userInfo?.first_name}</Name>
        </Title>
      </BounceRight>
    </WelcomeDiv>
  )
}
