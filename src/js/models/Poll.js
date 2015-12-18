import Backbone from "backbone";
import { Candidates } from "./Candidate";

var Poll = Backbone.Model.extend({
    initialize: function () {
        this.set("candidates", new Candidates());
        this.listenTo(this.get("candidates"), "all", () => {
            this.trigger("update", this);
        });
    }
});

var Polls = Backbone.Collection.extend({
    model: Poll
});

export { Poll, Polls };
