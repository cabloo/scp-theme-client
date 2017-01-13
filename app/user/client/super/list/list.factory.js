(function () {
  'use strict';

  angular
    .module('app.user.client.super.list')
    .factory('SuperClientList', SuperClientListFactory)
    ;

  /**
   * SuperClientList Factory
   *
   * @ngInject
   */
  function SuperClientListFactory (List, ListConfirm, ApiKey) {
    return function () {
      var currentUserId = ApiKey.owner().id;
      var list = List('client/'+currentUserId+'/super');
      var clientList = List('client');
      
      list.confirm = ListConfirm(list, 'client.super.modal.delete');
      list.bulk.add('Delete', list.confirm.delete);

      var createSuperClient = list.create;
      list.create = function(data) {
        return clientList.create(data).then(function(client) {
          return createSuperClient({
            client_id: client.id
          })
        })
      }

      return list;
    };
  }
})();