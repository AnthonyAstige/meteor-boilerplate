/**
 * 'Tasks' sample collection definition.  There is no `index.js` file
 * in the `api` directory.
 *
 * The collection would have corresponding ValidatedMethod for any mutator
 * operation.  In this case, it is for insert, delete, update
 *
 * When creating methods, ensure that you are not overriding the existing
 * ones accidentally.
 * @module
 */
import { Mongo } from 'meteor/mongo'
import { LoggedInValidatedMethod } from './LoggedInValidatedMethod'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

/**
 * Collection class.  This is where methods are defined against a Mongo
 * collection.
 */
class TasksCollection extends Mongo.Collection {
  /**
   * The constructor calls the super class to set the collection name,
   * attaches the schema, then defines the methods.
   */
  constructor () {
    super('tasks')
    this.attachSchema(new SimpleSchema({
      text: {
        type: String
      },
      createdOn: {
        type: Date,
        optional: true
      },
      secret: {
        type: Number,
        optional: true
      }
    }))

    this.insertTaskMethod = new LoggedInValidatedMethod('tasks.insert',
      {
        text: {
          type: String,
          optional: false
        }
      }, {
        run: (params) => {
          super.insert(params)
        }
      })

    this.removeTaskMethod = new LoggedInValidatedMethod('tasks.remove',
      {
        id: {
          type: String,
          optional: false
        }
      }, {
        run: (params) => {
          super.remove(params.id)
        }
      })

    this.updateTaskMethod = new LoggedInValidatedMethod('tasks.update',
      {
        id: {
          type: String,
          optional: false
        },
        text: {
          type: String,
          optional: false
        }
      }, {
        run: (params) => {
          super.update(params.id, {
            $set: {
              text: params.text
            }
          })
        }
      })
  }

  /**
   * Insert task method.  This is an example of an exposed method so the
   * server can make changes to the run method that is not visible on the
   * client.  It uses {@link LoggedInValidatedMethod} to reduce the
   * repetition.
   * @param {{text:String}} params
   * @return ValidatedMethod
   */
  get insertTask () {
    return this.insertTaskMethod
  }

  /**
   * Update task.
   * @param {{id: string, text:string}} params
   * @return ValidatedMethod
   */
  get updateTask () {
    return this.updateTaskMethod
  }

  /**
   * Remove task.
   * @param {{id: string}} params contains the ID of the task to delete.
   * @return ValidatedMethod
   */
  get removeTask () {
    return this.removeTaskMethod
  }
}

/**
 * Tasks collection instance.
 */
export const Tasks = new TasksCollection()

