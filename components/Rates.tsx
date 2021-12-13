import gql from "graphql-tag"
import { Button, Tag } from "@blueprintjs/core"
import { Col, Row } from "react-grid-system"
import { RatesFragment } from "../generated/gql-client"
import styled from "styled-components"

const RateName = styled.label`
  font-size: 11px;
  font-weight: bold;
  text-transform: capitalize;
  display: block;
`

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  > img {
    width: 32px;
    height: 32px;
    margin-top: 4px;
    margin-right: 6px;
    border: solid 2px #d79d4761;
    border-radius: 4px;
  }
`

gql`
  fragment Rates on ServerRates {
    xp
    sp
    adena
    drop
    spoil
  }
`

const IconImageUrl = {
  xp: "http://l2j.ru/highfive/img/icons/br_cash_rune_of_exp_i00.png",
  sp: "http://l2j.ru/highfive/img/icons/br_cash_rune_of_sp_i00.png",
  adena: "http://l2j.ru/highfive/img/icons/etc_adena_i00.png",
  drop: "http://l2j.ru/highfive/img/icons/br_lucky_bag_i00.png",
  spoil: "http://l2j.ru/highfive/img/icons/skill0254.png",
} as const

type RateProps = {
  rate: keyof typeof IconImageUrl
  value: number
  hasIcon?: boolean
}

const Rate: React.FC<RateProps> = ({ rate, value, hasIcon }) => {
  return (
    <StyledCol>
      {hasIcon && <img src={IconImageUrl[rate]} alt={rate} />}
      <div>
        <RateName>{rate}</RateName>
        <Tag minimal>{value}x</Tag>
      </div>
    </StyledCol>
  )
}

type Props = {
  rates?: RatesFragment | null
  displayIcons?: boolean
}

export const Rates: React.FC<Props> = ({ rates, displayIcons }) => {
  if (!rates) {
    return null
  }

  return (
    <Row gutterWidth={6}>
      {Object.keys(IconImageUrl).map(key => (
        <Rate
          key={key}
          rate={key as keyof typeof IconImageUrl}
          value={rates[key]}
          hasIcon={displayIcons}
        />
      ))}
    </Row>
  )
}
