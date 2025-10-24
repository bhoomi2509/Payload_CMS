// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Pages],
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.AWS_BUCKET_NAME!,
      config: {
        region: process.env.AWS_REGION!,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          sessionToken: process.env.AWS_SESSION_TOKEN!, 
        },
      },
    }),

    payloadCloudPlugin(),
  ],
  onInit: async (payload) => {
    try {
      // Use literal slug with a cast to satisfy CollectionSlug type
      const existing = await payload.find({ collection: 'payload-users' as any, limit: 1, depth: 0 })
      if ((existing?.totalDocs || 0) === 0) {
        const email = process.env.ADMIN_EMAIL
        const password = process.env.ADMIN_PASSWORD
        if (email && password) {
          await payload.create({
            collection: 'payload-users' as any,
            data: { email, password, role: 'admin' },
            overrideAccess: true, // bypass field access to set role on first user
          })
          payload.logger.info(`Seeded initial admin user: ${email}`)
        } else {
          payload.logger.warn('No ADMIN_EMAIL/ADMIN_PASSWORD provided; cannot seed initial admin user.')
        }
      }
    } catch (e) {
      // do not crash app on seed failure
      payload.logger.error(`Admin seed failed: ${e instanceof Error ? e.message : String(e)}`)
    }
  },
})

