import mongoose from 'mongoose'
import {ConfigInfo} from '../../config'

export function loadDBConnection(appConfig: ConfigInfo) {
  let db: typeof mongoose | undefined = undefined

  const dbUri: string = `mongodb://${appConfig.DB_HOST}:${appConfig.DB_PORT}`  
  
  return {
    start: async () => {
      db = await mongoose.connect(dbUri, {
        user: appConfig.DB_USER,
        pass: appConfig.DB_PASSWORD,
        dbName: appConfig.DB_DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      })
      console.log(`- Connected to MongoDB ${appConfig.NODE_ENV}`)
    },
    close: async () => {
      if (db) await db.disconnect()
      console.log('- Closed MongoDB connection')
    },
  }
}
