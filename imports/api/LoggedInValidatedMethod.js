import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import _ from 'lodash'

/**
 * Extends validated method to require the user to be logged in.
 */
class LoggedInValidatedMethod extends ValidatedMethod {
  /**
   * @param {string} name DDP method name
   * @param {Object} schema SimpleSchema schema
   * @param {Object} options other options for validated method
   */
  constructor (name, schema, options) {
    super(_.extend({}, options, {
      name,
      mixins: [LoggedInMixin],
      checkLoggedInError: {
        error: 'notLoggedin'
      },
      validate: new SimpleSchema(schema).validator()
    }))
  }
}

export { LoggedInValidatedMethod }
