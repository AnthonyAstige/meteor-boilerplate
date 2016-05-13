/**
 * Tasks edit sub state definition.  This is not reactive.
 *
 * @module
 */
import module from '../module.js'
import { Meteor } from 'meteor/meteor'
import stateTemplateUrl from './edit.html'
import { Tasks } from '/imports/api/tasks'

/**
 * Tasks edit sub-state controller.
 */
class EditStateController {
  /**
   * Constructor for the controller.  Assigns injected values as class members.
   */
  constructor ($state, $stateParams, entry) {
    this.state = $state
    this.entry = entry
    this.id = $stateParams.id
  }

  save () {
    Tasks.updateTask.call({
      id: this.id,
      text: this.entry.text
    }, (err) => {
      if (err) {
        this.error = err
      } else {
        this.state.go('^.list')
      }
    })
  }

  cancel () {
    this.state.go('^.list')
  }

}

// eslint-disable-next-line angular/module-getter
angular.module(module.name)
  .config(($stateProvider) => {
    $stateProvider.state('tasks.edit', {
      controller: EditStateController,
      controllerAs: 'editStateCtrl',
      resolve: {
        entry: ($stateParams, $q) => $q((resolve, reject) => {
          let resolved = false
          const h = Meteor.subscribe('tasks', $stateParams.id,
            {
              onReady: () => {
                resolve(Tasks.findOne($stateParams.id))
                resolved = true
                h.stop()
              },
              onStop: (error) => {
                if (!resolved) {
                  reject(error)
                }
              }
            }
          )
        })
      },
      templateUrl: stateTemplateUrl,
      url: '/:id'
    })
  })
