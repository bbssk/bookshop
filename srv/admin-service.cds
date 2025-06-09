using {sap.capire.bookshop as my} from '../db/schema';

service AdminService @(requirs: 'authenticated-user') {
    //entity Books   as projection on my.Books;
    @readonly entity Books      as
        projection on my.Books {
            *,
            author,
            author.name as AUTHOR
        }
        excluding {
            createdBy,
            modifiedBy
        } order by genre asc;

    entity Authors    as projection on my.Authors;
    entity Orders     as projection on my.Orders;
    entity OrderItems as projection on my.OrderItems;
    entity abc as projection on my.abc;
}
