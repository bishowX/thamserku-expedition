import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'routeWaypoint',
  title: 'Route Waypoint',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', description: 'e.g. Base Camp' }),
    defineField({ name: 'altitude', title: 'Altitude', type: 'string', description: 'e.g. 5,364 m' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'altitude' },
  },
})
