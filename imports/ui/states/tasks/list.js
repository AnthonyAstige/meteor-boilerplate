/**
 * Tasks state definition.  This is a simple CRUDL implementation, no search
 * paging or sorting.
 *
 * @module
 */
import module from '../module.js'
import stateTemplateUrl from './list.html'
import { Tasks } from '/imports/api/tasks'

/**
 * List state controller.
 */
class TasksStateController {
  /**
   * Constructor for the controller.  Assigns injected values as class members.
   */
  constructor ($state, $reactive, $scope) {
    $reactive(this).attach($scope)
    this.state = $state
    this.subscribe('tasks')
    this.helpers({
      entries: () => Tasks.find({})
    })
  }

  add () {
    this.state.go('^.add')
  }
  edit (id) {
    this.state.go('^.edit', {
      id
    })
  }
  delete (id) {
    Tasks.removeTask.call({
      id
    })
  }
}

// eslint-disable-next-line angular/module-getter
angular.module(module.name)
  .config(($stateProvider) => {
    $stateProvider.state('tasks.list', {
      controller: TasksStateController,
      controllerAs: 'listStateCtrl',
      templateUrl: stateTemplateUrl,
      url: ''
    })
  })
