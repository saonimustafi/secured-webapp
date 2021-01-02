var BookView = require('./book');
var Book = require('../models/book');
var Library = require('../collections/library');
var Backbone = global.Backbone;

module.exports = Backbone.View.extend({
    el: '#books',

    events:{
        'click #add':'addBook'
    },
    
    addBook: function( e ) {
        e.preventDefault();

        var formData = {};
        // if(document.getElementById("coverImage") && document.getElementById("coverImage").files && document.getElementById("coverImage").files[0].name) {
        //     formData["coverImage"] = document.getElementById("coverImage").files[0].name;
        // }
        $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
            if( $( el ).val() !== '' )
            {
                formData[ el.id ] = $( el ).val();
            }
        });

        var newBook = new Book( formData );
        this.collection.add(newBook);
        // console.log("this.collection = "+ JSON.stringify(this.collection));
        // this.renderBook(newBook);
    },

    initialize: function( initialBooks ) {
        this.collection = new Library( initialBooks );
        this.render();
        this.listenTo( this.collection, 'add', this.renderBook );
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function( item ) {
        var bookView = new BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    }
});