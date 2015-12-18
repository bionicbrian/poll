import Backbone from "backbone";
import { Votes } from "./Vote";

var Candidate = Backbone.Model.extend({
    initialize: function () {
        this.set("votes", new Votes());
        this.listenTo(this.get("votes"), "all", () => {
            this.trigger("update");
        });
    }
});

var Candidates = Backbone.Collection.extend({
    model: Candidate
});

export { Candidate, Candidates };
