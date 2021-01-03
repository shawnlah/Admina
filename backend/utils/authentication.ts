import bcrypt from 'bcryptjs'
import logger from '../logger'

export const generateHash = async (rounds: number) => {
  try {
    logger.info('[USER] Generating salt...')
    return (await bcrypt.genSalt(rounds))
  } catch (error) {
    logger.error('[USER] An error has occured while generating salt', error)
    throw error
  }
}

export const hashPassword = async (pw: string) => {
  const salt = await generateHash(10)
  try {
    logger.info('[USER] Hashing password...')
    return (await bcrypt.hash(pw, salt))
  } catch (error) {
    logger.error('[USER] An error has occured while hashing password', error)
    throw error
  }
}

export const checkPassword = async (pw: string, hash: string) => {
  try {
    return (await bcrypt.compare(pw, hash))
  } catch (error) {
    logger.error('[USER] An error has occured while checking password: ', error)
    throw error
  }
}
