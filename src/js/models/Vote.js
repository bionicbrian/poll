import Backbone from "backbone";

var Vote = Backbone.Model.extend({ });
var Votes = Backbone.Collection.extend({
    model: Vote
});

export { Vote, Votes };
