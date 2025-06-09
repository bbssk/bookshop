using {
    Currency,
    managed,
    sap,
    cuid
} from '@sap/cds/common';

namespace sap.capire.bookshop;


entity Books : cuid,managed {

    //key ID       : Integer;
        title    : localized String(111);
        descr    : localized String(1111);
        author   : Association to Authors;
        //genre    : Association to Genres;
        genre  : Genre;
        stock    : Integer;
        price    : Decimal(9, 2);
        currency : Currency;

}

entity Authors : cuid ,managed {
    //key ID    : Integer;
        name  : String(111);
        books : Association to many Books
                    on books.author = $self;
}

entity Genres : sap.common.CodeList {
    key ID       : Integer;
        parent   : Association to Genres;
        children : Composition of many Genres
                       on children.parent = $self;
}

type Genre : String enum {
  Mystery; Fiction; Drama;
}

entity Orders : cuid{ 
  Items : Composition of many OrderItems on Items.parent = $self;
}
entity OrderItems { // to be accessed through Orders only
  key parent : Association to Orders;
  key pos    : Integer;
  quantity   : Integer;
}

entity abc{
  key ID: UUID;
  comment:String;
  
  }
