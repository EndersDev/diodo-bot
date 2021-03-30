import dotenv from 'dotenv'
dotenv.config()

export const CHNS = {
  ORG: process.env.ORG_CHN_ID,
  REG: process.env.REG_CHN_ID
}

export const SEM = [
  process.env.SEM_1_ID,
  process.env.SEM_2_ID,
  process.env.SEM_3_ID,
  process.env.SEM_4_ID,
  process.env.SEM_5_ID,
  process.env.SEM_6_ID,
  process.env.SEM_OPT_ID
]

export const ROLE = {
  ELE: process.env.ROLE_ELE,
  RES: process.env.ROLE_RES,
  CAP: process.env.ROLE_CAP
}
