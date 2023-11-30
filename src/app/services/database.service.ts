
var db = new JsStore.Connection(new Worker('js/lib/jsstore.worker.js'));
var tblState = {
  name: 'State',
  columns: {
    id:{primaryKey: true,autoIncrement: true},
    name: {notNull: true, dataType:"string"}
  }
};
var tblReview = {
  name: 'Review',
  columns: {
    id:{ primaryKey: true, autoIncrement: true },
    resName:  { notNull: true, dataType: "string" },
    resId:  { notNull: true, dataType: "string" },
    stateId: {notNull: true, dataType: "number",
      foreignKey:{
        table: 'State',
        column: 'id'
      }},
    revEmail: {dataType:"string"},
    revCmt: {dataType:"string"},
    hasRating: {dataType: "boolean"},
    rating1: {dataType: "number"},
    rating2: {dataType: "number"},
    rating3: {dataType: "number"},
  }
};

var database = {
  name: "NTReviewDB",
  tables: [tblReview,tblState]
}

function errorHandler(error) {
  console.error("SQL error: " + error.message);
}

var DB = {
  createDatabase: async function () {
    var isDbCreated = await db.initDb(database);
    if (isDbCreated) {
      alert('Db Created & connection is opened');
    } else {
      alert('Connection is opened');
    }
    var checkIfExist = await db.select({
      from: "State"
    });
    if (checkIfExist.length>0){
      console.log("State table existed");
    }
    else {
      var noOfRowsInserted = await db.insert({
        into: "State",
        values: [
          {name: "Ontario"},
          {name: "Alberta"},
          {name: "British Columbia"},
          {name: "Nova Scotia"},
          {name: "Manitoba"}],
      });
      if (noOfRowsInserted > 0) {
        console.log('Successfully Added');
      }
    }

  },
  deleteDatabase: async function() {
    var deleteRequest = window.indexedDB.deleteDatabase("TestDB");

    deleteRequest.onerror = function(event) {
      console.log("Error deleting database.");
    };

    deleteRequest.onsuccess = function(event) {
      console.log("Database deleted successfully");

      console.log(event.result); // should be undefined
    };
  }
};
