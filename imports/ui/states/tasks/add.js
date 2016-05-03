/**
 * Tasks state definition.  This is a simple CRUDL implementation, no search
 * paging or sorting.
 *
 * @module
 */
import module from '../module.js'
import stateTemplateUrl from './add.html'
import { Tasks } from '/imports/api/tasks'
/**
 * Home state controller.
 */
class AddStateController {
  /**
   * Constructor for the controller.  Assigns injected values as class members.
   */
  constructor ($state) {
    this.state = $state
    this.entry = {}
  }

  add () {
    Tasks.insertTask.call(this.entry, (err) => {
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
    $stateProvider.state('tasks.add', {
      controller: AddStateController,
      controllerAs: 'addStateCtrl',
      templateUrl: stateTemplateUrl,
      url: '/new'
    })
  })
