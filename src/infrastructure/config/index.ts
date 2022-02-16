import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

export interface ConfigInfo {
  NODE_ENV: string
  SERVER_PORT: number
  DB_HOST: string,
  DB_PORT: number,
  DB_DATABASE: string,
  DB_USER: string,
  DB_PASSWORD: string,
}

function loadConfig() {
  const configSchema = Joi.object<ConfigInfo>({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    SERVER_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT:Joi.number().required(),
    DB_DATABASE: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
  })

  const {error, value} = configSchema.validate(process.env, {allowUnknown: true})  
  console.log('- Environment variables loaded...')

  if (error) throw error
  return {...value} as ConfigInfo
}

export {loadConfig}
