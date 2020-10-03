var blogEntries = [];

class BlogEntry {
    constructor(primaryKey, sortKey, date, entry, happy, iate) {
        this.pk = {};
        this.pk.N = primaryKey.toString();
        this.sk = {};
        this.sk.N = sortKey.toString();
        this.skdate = {};
        this.skdate.S = new Date(date).toDateString();
        this.date = {};
        this.date.S = new Date(date).toDateString();
        this.entry = {};
        this.entry.S = entry;
        this.happy = {};
        this.happy.BOOL = happy;
        if (iate != null) {
            this.iate = {};
            this.iate.SS = iate;
        }
        this.month = {};
        this.month.N = new Date(date).getMonth().toString();
    }
}

blogEntries.push(new BlogEntry(0, 0, 'August 28 2019', "Yay, first day of class!", true, ["Cheez-Its", "M&Ms"]));
blogEntries.push(new BlogEntry(1, 1, 'sortKey1','October 31, 2015', "I piloted my first solo flight!", true, ["pancakes"]));
blogEntries.push(new BlogEntry(2, 2, 'sortKey2', 8675309, "867-5309?", false));
blogEntries.push(new BlogEntry(3, 3, 'sortKey3','September 25, 2019', "I taught my favorite students.", true, ["peas", "carrots"]));

console.log(blogEntries);