// Sample university data with updated fields and exams
const universitiesData = [
    {
        id: 1,
        name: "Harvard University",
        country: "USA",
        location: "Cambridge, Massachusetts",
        fees: 54000,
        ranking: "#1 Global",
        exams: ["TOEFL", "SAT", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Business", "Medicine", "Arts", "Law"],
        website: "https://www.harvard.edu"
    },
    {
        id: 2,
        name: "Stanford University",
        country: "USA",
        location: "Stanford, California",
        fees: 56000,
        ranking: "#2 Global",
        exams: ["TOEFL", "GRE", "GMAT", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Business", "Economics"],
        website: "https://www.stanford.edu"
    },
    {
        id: 3,
        name: "University of Oxford",
        country: "UK",
        location: "Oxford, England",
        fees: 45000,
        ranking: "#3 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Arts", "Medicine", "Science", "Law"],
        website: "https://www.ox.ac.uk"
    },
    {
        id: 4,
        name: "University of Cambridge",
        country: "UK",
        location: "Cambridge, England",
        fees: 44000,
        ranking: "#4 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Science", "Arts", "Economics"],
        website: "https://www.cam.ac.uk"
    },
    {
        id: 5,
        name: "MIT",
        country: "USA",
        location: "Cambridge, Massachusetts",
        fees: 55000,
        ranking: "#5 Global",
        exams: ["TOEFL", "GRE", "SAT", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Science", "Economics"],
        website: "https://www.mit.edu"
    },
    {
        id: 6,
        name: "University of Toronto",
        country: "Canada",
        location: "Toronto, Ontario",
        fees: 35000,
        ranking: "#18 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Medicine", "Business", "Psychology"],
        website: "https://www.utoronto.ca"
    },
    {
        id: 7,
        name: "University of Melbourne",
        country: "Australia",
        location: "Melbourne, Victoria",
        fees: 38000,
        ranking: "#33 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Arts", "Engineering", "Medicine", "Psychology"],
        website: "https://www.unimelb.edu.au"
    },
    {
        id: 8,
        name: "ETH Zurich",
        country: "Switzerland",
        location: "Zurich",
        fees: 1500,
        ranking: "#8 Global",
        exams: ["TOEFL", "IELTS", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Science"],
        website: "https://ethz.ch"
    },
    {
        id: 9,
        name: "Technical University of Munich",
        country: "Germany",
        location: "Munich, Bavaria",
        fees: 3000,
        ranking: "#50 Global",
        exams: ["TOEFL", "IELTS", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Science"],
        website: "https://www.tum.de"
    },
    {
        id: 10,
        name: "Sorbonne University",
        country: "France",
        location: "Paris",
        fees: 4000,
        ranking: "#72 Global",
        exams: ["TOEFL", "IELTS", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Arts", "Science", "Medicine", "Law"],
        website: "https://www.sorbonne-universite.fr"
    },
    {
        id: 11,
        name: "University of Amsterdam",
        country: "Netherlands",
        location: "Amsterdam",
        fees: 12000,
        ranking: "#58 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Business", "Arts", "Science", "Psychology"],
        website: "https://www.uva.nl"
    },
    {
        id: 12,
        name: "McGill University",
        country: "Canada",
        location: "Montreal, Quebec",
        fees: 32000,
        ranking: "#31 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Medicine", "Engineering", "Arts", "Accounting"],
        website: "https://www.mcgill.ca"
    },
    {
        id: 13,
        name: "Australian National University",
        country: "Australia",
        location: "Canberra, ACT",
        fees: 40000,
        ranking: "#27 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Science", "Arts", "Engineering", "Economics"],
        website: "https://www.anu.edu.au"
    },
    {
        id: 14,
        name: "Imperial College London",
        country: "UK",
        location: "London, England",
        fees: 47000,
        ranking: "#6 Global",
        exams: ["IELTS", "TOEFL", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Medicine", "Science"],
        website: "https://www.imperial.ac.uk"
    },
    {
        id: 15,
        name: "California Institute of Technology",
        country: "USA",
        location: "Pasadena, California",
        fees: 58000,
        ranking: "#7 Global",
        exams: ["TOEFL", "SAT", "GRE", "Duolingo", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Science", "Computer Science"],
        website: "https://www.caltech.edu"
    },
    {
        id: 16,
        name: "Tsinghua University",
        country: "China",
        location: "Beijing",
        fees: 8000,
        ranking: "#17 Global",
        exams: ["TOEFL", "IELTS", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Business", "Economics"],
        website: "https://www.tsinghua.edu.cn"
    },
    {
        id: 17,
        name: "Peking University",
        country: "China",
        location: "Beijing",
        fees: 7500,
        ranking: "#12 Global",
        exams: ["TOEFL", "IELTS", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Arts", "Science", "Law", "Economics"],
        website: "https://www.pku.edu.cn"
    },
    {
        id: 18,
        name: "Shanghai Jiao Tong University",
        country: "China",
        location: "Shanghai",
        fees: 9000,
        ranking: "#46 Global",
        exams: ["TOEFL", "IELTS", "PTE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Medicine", "Business", "Accounting"],
        website: "https://www.sjtu.edu.cn"
    },
    {
    name: "Southwest Jiaotong University",
    country: "China",
    location: "Chengdu, Sichuan",
    fees: 5900,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.swjtu.edu.cn"
},
{
    id: 212,
    name: "Chongqing University",
    country: "China",
    location: "Chongqing",
    fees: 6300,
    ranking: "#651 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Arts", "Medicine"],
    website: "https://www.cqu.edu.cn"
},
{
    id: 213,
    name: "South China Normal University",
    country: "China",
    location: "Guangzhou, Guangdong",
    fees: 6400,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Psychology", "Medicine"],
    website: "https://www.scnu.edu.cn"
},
{
    id: 214,
    name: "Shenzhen University",
    country: "China",
    location: "Shenzhen, Guangdong",
    fees: 7500,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Science"],
    website: "https://www.szu.edu.cn"
},
{
    id: 215,
    name: "Capital Medical University",
    country: "China",
    location: "Beijing",
    fees: 7000,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Psychology", "Arts"],
    website: "https://www.ccmu.edu.cn"
},
{
    id: 216,
    name: "China Medical University",
    country: "China",
    location: "Shenyang, Liaoning",
    fees: 6500,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Psychology", "Arts"],
    website: "https://www.cmu.edu.cn"
},
{
    id: 217,
    name: "Southern Medical University",
    country: "China",
    location: "Guangzhou, Guangdong",
    fees: 6800,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Psychology", "Arts"],
    website: "https://www.smu.edu.cn"
},
{
    id: 218,
    name: "Rice Institute",
    country: "USA",
    location: "Houston, Texas",
    fees: 52000,
    ranking: "#147 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Science", "Computer Science"],
    website: "https://www.rice.edu"
},
{
    id: 219,
    name: "University of St Andrews",
    country: "UK",
    location: "St Andrews, Scotland",
    fees: 41500,
    ranking: "#96 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Business", "Psychology"],
    website: "https://www.st-andrews.ac.uk"
},
{
    id: 220,
    name: "University of New Brunswick",
    country: "Canada",
    location: "Fredericton, New Brunswick",
    fees: 21000,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.unb.ca"
},
{
    id: 221,
    name: " Australia University - Bond University",
    country: "Australia",
    location: "Gold Coast, Queensland",
    fees: 38000,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Law", "Medicine", "Arts"],
    website: "https://www.bond.edu.au"
},
{
    id: 222,
    name: " Germany University - University of Konstanz",
    country: "Germany",
    location: "Konstanz, Baden-Württemberg",
    fees: 3000,
    ranking: "#291 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Arts", "Economics", "Psychology"],
    website: "https://www.uni-konstanz.de"
},
{
    id: 223,
    name: " France University - INSEAD",
    country: "France",
    location: "Fontainebleau",
    fees: 89000,
    ranking: "#95 Global",
    exams: ["TOEFL", "IELTS", "PTE", "GMAT"],
    levels: ["Master", "PhD"],
    fields: ["Business", "Economics", "Accounting", "Law"],
    website: "https://www.insead.edu"
},
{
    id: 224,
    name: " Netherlands University - Nyenrode Business University",
    country: "Netherlands",
    location: "Breukelen",
    fees: 28000,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "GMAT"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Economics", "Accounting", "Law"],
    website: "https://www.nyenrode.nl"
},
{
    id: 225,
    name: " Switzerland University - Franklin University Switzerland",
    country: "Switzerland",
    location: "Lugano",
    fees: 45000,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "SAT"],
    levels: ["Bachelor", "Master"],
    fields: ["Business", "Arts", "Computer Science", "Psychology"],
    website: "https://www.fus.edu"
},
{
    id: 226,
    name: "University of Rochester",
    country: "USA",
    location: "Rochester, New York",
    fees: 56000,
    ranking: "#147 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Arts"],
    website: "https://www.rochester.edu"
},
{
    id: 227,
    name: "Case Western Reserve University",
    country: "USA",
    location: "Cleveland, Ohio",
    fees: 55000,
    ranking: "#176 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Science"],
    website: "https://www.case.edu"
},
{
    id: 228,
    name: "Tufts University",
    country: "USA",
    location: "Medford, Massachusetts",
    fees: 58500,
    ranking: "#=193 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Business"],
    website: "https://www.tufts.edu"
},
{
    id: 229,
    name: "Wake Forest University",
    country: "USA",
    location: "Winston-Salem, North Carolina",
    fees: 57000,
    ranking: "#=259 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Medicine", "Law", "Arts"],
    website: "https://www.wfu.edu"
},
{
    id: 230,
    name: "Lehigh University",
    country: "USA",
    location: "Bethlehem, Pennsylvania",
    fees: 55500,
    ranking: "#=381 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.lehigh.edu"
},
{
    id: 231,
    name: "University of Dundee",
    country: "UK",
    location: "Dundee, Scotland",
    fees: 33000,
    ranking: "#=354 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Arts", "Science", "Law"],
    website: "https://www.dundee.ac.uk"
},
{
    id: 232,
    name: "University of Surrey",
    country: "UK",
    location: "Guildford, England",
    fees: 34500,
    ranking: "#=267 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.surrey.ac.uk"
},
{
    id: 233,
    name: "Loughborough University",
    country: "UK",
    location: "Loughborough, England",
    fees: 35000,
    ranking: "#=256 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.lboro.ac.uk"
},
{
    id: 234,
    name: "Lancaster University",
    country: "UK",
    location: "Lancaster, England",
    fees: 36000,
    ranking: "#=146 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Computer Science", "Arts", "Science"],
    website: "https://www.lancaster.ac.uk"
},
{
    id: 235,
    name: "University of Leicester",
    country: "UK",
    location: "Leicester, England",
    fees: 32500,
    ranking: "#=279 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.le.ac.uk"
},
{
    id: 236,
    name: "Acadia University",
    country: "Canada",
    location: "Wolfville, Nova Scotia",
    fees: 20000,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Arts", "Science", "Business", "Engineering"],
    website: "https://www.acadiau.ca"
},
{
    id: 237,
    name: "Mount Allison University",
    country: "Canada",
    location: "Sackville, New Brunswick",
    fees: 19500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Arts", "Science", "Business", "Music"],
    website: "https://www.mta.ca"
},
{
    id: 238,
    name: "St. Francis Xavier University",
    country: "Canada",
    location: "Antigonish, Nova Scotia",
    fees: 21500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Arts", "Science", "Business", "Engineering"],
    website: "https://www.stfx.ca"
},
{
    id: 239,
    name: "University of Prince Edward Island",
    country: "Canada",
    location: "Charlottetown, Prince Edward Island",
    fees: 18000,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Business"],
    website: "https://www.upei.ca"
},
{
    id: 240,
    name: "Cape Breton University",
    country: "Canada",
    location: "Sydney, Nova Scotia",
    fees: 17500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.cbu.ca"
},
{
    id: 241,
    name: "Central Queensland University",
    country: "Australia",
    location: "Rockhampton, Queensland",
    fees: 25000,
    ranking: "#=651 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.cqu.edu.au"
},
{
    id: 242,
    name: "Edith Cowan University",
    country: "Australia",
    location: "Perth, Western Australia",
    fees: 26000,
    ranking: "#=601 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Arts", "Computer Science", "Engineering"],
    website: "https://www.ecu.edu.au"
},
{
    id: 243,
    name: "Southern Cross University",
    country: "Australia",
    location: "Lismore, New South Wales",
    fees: 24000,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Arts", "Science", "Engineering"],
    website: "https://www.scu.edu.au"
},
{
    id: 244,
    name: "University of the Sunshine Coast",
    country: "Australia",
    location: "Sunshine Coast, Queensland",
    fees: 23000,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Arts", "Science", "Medicine"],
    website: "https://www.usc.edu.au"
},
{
    id: 245,
    name: "Victoria University",
    country: "Australia",
    location: "Melbourne, Victoria",
    fees: 27000,
    ranking: "#=701 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Engineering", "Arts", "Science"],
    website: "https://www.vu.edu.au"
},
{
    id: 246,
    name: "University of Bayreuth",
    country: "Germany",
    location: "Bayreuth, Bavaria",
    fees: 2800,
    ranking: "#=461 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Science", "Arts", "Law"],
    website: "https://www.uni-bayreuth.de"
},
{
    id: 247,
    name: "University of Passau",
    country: "Germany",
    location: "Passau, Bavaria",
    fees: 2700,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Computer Science", "Arts", "Law"],
    website: "https://www.uni-passau.de"
},
{
    id: 248,
    name: "University of Mannheim",
    country: "Germany",
    location: "Mannheim, Baden-Württemberg",
    fees: 3100,
    ranking: "#=451 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Economics", "Computer Science", "Arts"],
    website: "https://www.uni-mannheim.de"
},
{
    id: 249,
    name: "University of Oldenburg",
    country: "Germany",
    location: "Oldenburg, Lower Saxony",
    fees: 2900,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Arts", "Medicine", "Engineering"],
    website: "https://www.uni-oldenburg.de"
},
{
    id: 250,
    name: "University of Bamberg",
    country: "Germany",
    location: "Bamberg, Bavaria",
    fees: 2600,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Business", "Computer Science", "Psychology"],
    website: "https://www.uni-bamberg.de"
},
{
    id: 251,
    name: "University of Poitiers",
    country: "France",
    location: "Poitiers, Nouvelle-Aquitaine",
    fees: 3000,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Medicine", "Law"],
    website: "https://www.univ-poitiers.fr"
},
{
    id: 252,
    name: "University of Angers",
    country: "France",
    location: "Angers, Pays de la Loire",
    fees: 2900,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.univ-angers.fr"
},
{
    id: 253,
    name: "University of Tours",
    country: "France",
    location: "Tours, Centre-Val de Loire",
    fees: 3050,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Arts", "Science", "Engineering"],
    website: "https://www.univ-tours.fr"
},
{
    id: 254,
    name: "University of Reims Champagne-Ardenne",
    country: "France",
    location: "Reims, Grand Est",
    fees: 2800,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Business"],
    website: "https://www.univ-reims.fr"
},
{
    id: 255,
    name: "University of Orléans",
    country: "France",
    location: "Orléans, Centre-Val de Loire",
    fees: 2950,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Arts", "Engineering", "Economics"],
    website: "https://www.univ-orleans.fr"
},
{
    id: 256,
    name: "Saxion University of Applied Sciences",
    country: "Netherlands",
    location: "Enschede",
    fees: 10500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Computer Science"],
    website: "https://www.saxion.edu"
},
{
    id: 257,
    name: "Fontys University of Applied Sciences",
    country: "Netherlands",
    location: "Eindhoven",
    fees: 10200,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Computer Science"],
    website: "https://www.fontys.edu"
},
{
    id: 258,
    name: "Avans University of Applied Sciences",
    country: "Netherlands",
    location: "Breda",
    fees: 10800,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Business", "Engineering", "Arts", "Computer Science"],
    website: "https://www.avans.nl"
},
{
    id: 259,
    name: "HAN University of Applied Sciences",
    country: "Netherlands",
    location: "Nijmegen",
    fees: 10600,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.han.nl"
},
{
    id: 260,
    name: "Amsterdam University of Applied Sciences",
    country: "Netherlands",
    location: "Amsterdam",
    fees: 11800,
    ranking: "#=701 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Business", "Engineering", "Arts", "Computer Science"],
    website: "https://www.hva.nl"
},
{
    id: 261,
    name: "University of Applied Sciences Northwestern Switzerland",
    country: "Switzerland",
    location: "Basel",
    fees: 1400,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Computer Science"],
    website: "https://www.fhnw.ch"
},
{
    id: 262,
    name: "Zurich University of Applied Sciences",
    country: "Switzerland",
    location: "Winterthur",
    fees: 1500,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Computer Science"],
    website: "https://www.zhaw.ch"
},
{
    id: 263,
    name: "University of Applied Sciences and Arts of Southern Switzerland",
    country: "Switzerland",
    location: "Lugano",
    fees: 1600,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Arts", "Computer Science", "Economics"],
    website: "https://www.supsi.ch"
},
{
    id: 264,
    name: "Bern University of Applied Sciences",
    country: "Switzerland",
    location: "Bern",
    fees: 1450,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.bfh.ch"
},
{
    id: 265,
    name: "HES-SO University of Applied Sciences Western Switzerland",
    country: "Switzerland",
    location: "Geneva",
    fees: 1550,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Engineering", "Business", "Arts", "Computer Science"],
    website: "https://www.hes-so.ch"
},
{
    id: 266,
    name: "Beijing University of Chemical Technology",
    country: "China",
    location: "Beijing",
    fees: 6300,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Business"],
    website: "https://www.buct.edu.cn"
},
{
    id: 267,
    name: "North China Electric Power University",
    country: "China",
    location: "Beijing",
    fees: 6100,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.ncepu.edu.cn"
},
{
    id: 268,
    name: "Beijing Forestry University",
    country: "China",
    location: "Beijing",
    fees: 5800,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Arts", "Economics"],
    website: "https://www.bjfu.edu.cn"
},
{
    id: 269,
    name: "Communication University of China",
    country: "China",
    location: "Beijing",
    fees: 6700,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Computer Science", "Business", "Psychology"],
    website: "https://www.cuc.edu.cn"
},
{
    id: 270,
    name: "China University of Political Science and Law",
    country: "China",
    location: "Beijing",
    fees: 6900,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Law", "Economics", "Business", "Arts"],
    website: "https://www.cupl.edu.cn"
},
{
    id: 271,
    name: "Shanghai University",
    country: "China",
    location: "Shanghai",
    fees: 7300,
    ranking: "#=501 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Arts", "Science", "Business"],
    website: "https://www.shu.edu.cn"
},
{
    id: 272,
    name: "Shanghai University of Finance and Economics",
    country: "China",
    location: "Shanghai",
    fees: 8200,
    ranking: "#=601 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Business", "Accounting", "Law"],
    website: "https://www.sufe.edu.cn"
},
{
    id: 273,
    name: "East China University of Political Science and Law",
    country: "China",
    location: "Shanghai",
    fees: 7600,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Law", "Economics", "Business", "Arts"],
    website: "https://www.ecupl.edu.cn"
},
{
    id: 275,
    name: "Shanghai Maritime University",
    country: "China",
    location: "Shanghai",
    fees: 6800,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Science", "Economics"],
    website: "https://www.shmtu.edu.cn"
},
{
    id: 276,
    name: "Guangdong University of Technology",
    country: "China",
    location: "Guangzhou, Guangdong",
    fees: 6400,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.gdut.edu.cn"
},
{
    id: 277,
    name: "Guangzhou University",
    country: "China",
    location: "Guangzhou, Guangdong",
    fees: 6200,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Arts", "Science", "Business"],
    website: "https://www.gzhu.edu.cn"
},
{
    id: 278,
    name: "Shantou University",
    country: "China",
    location: "Shantou, Guangdong",
    fees: 6000,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Business"],
    website: "https://www.stu.edu.cn"
},
{
    id: 279,
    name: "Guangdong University of Foreign Studies",
    country: "China",
    location: "Guangzhou, Guangdong",
    fees: 6500,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Business", "Economics", "Law"],
    website: "https://www.gdufs.edu.cn"
},
{
    id: 280,
    name: "Southern University of Science and Technology",
    country: "China",
    location: "Shenzhen, Guangdong",
    fees: 8000,
    ranking: "#=323 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.sustech.edu.cn"
},
{
    id: 281,
    name: "Nanjing University of Aeronautics and Astronautics",
    country: "China",
    location: "Nanjing, Jiangsu",
    fees: 6300,
    ranking: "#=601 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.nuaa.edu.cn"
},
{
    id: 282,
    name: "Nanjing University of Science and Technology",
    country: "China",
    location: "Nanjing, Jiangsu",
    fees: 6100,
    ranking: "#=651 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.njust.edu.cn"
},
{
    id: 283,
    name: "China Pharmaceutical University",
    country: "China",
    location: "Nanjing, Jiangsu",
    fees: 6000,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Engineering", "Business"],
    website: "https://www.cpu.edu.cn"
},
{
    id: 284,
    name: "Nanjing Normal University",
    country: "China",
    location: "Nanjing, Jiangsu",
    fees: 5800,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Psychology", "Medicine"],
    website: "https://www.njnu.edu.cn"
},
{
    id: 285,
    name: "River University",
    country: "USA",
    location: "Miami, Florida",
    fees: 49000,
    ranking: "#=401 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Engineering", "Medicine", "Arts"],
    website: "https://www.miami.edu"
},
{
    id: 286,
    name: "Tulane University",
    country: "USA",
    location: "New Orleans, Louisiana",
    fees: 58000,
    ranking: "#=419 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Arts", "Law"],
    website: "https://www.tulane.edu"
},
{
    id: 287,
    name: "University of Denver",
    country: "USA",
    location: "Denver, Colorado",
    fees: 53000,
    ranking: "#=801 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Engineering", "Arts", "Law"],
    website: "https://www.du.edu"
},
{
    id: 288,
    name: "University of Oregon",
    country: "USA",
    location: "Eugene, Oregon",
    fees: 44000,
    ranking: "#=601 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Business", "Science", "Psychology"],
    website: "https://www.uoregon.edu"
},
{
    id: 289,
    name: "University of Kansas",
    country: "USA",
    location: "Lawrence, Kansas",
    fees: 42000,
    ranking: "#=451 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Business"],
    website: "https://www.ku.edu"
},
{
    id: 290,
    name: "University of Oklahoma",
    country: "USA",
    location: "Norman, Oklahoma",
    fees: 40000,
    ranking: "#=501 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Medicine"],
    website: "https://www.ou.edu"
},
{
    id: 291,
    name: "Swansea University",
    country: "UK",
    location: "Swansea, Wales",
    fees: 31000,
    ranking: "#=425 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Arts", "Science"],
    website: "https://www.swansea.ac.uk"
},
{
    id: 292,
    name: "Bangor University",
    country: "UK",
    location: "Bangor, Wales",
    fees: 29000,
    ranking: "#=601 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Psychology", "Business"],
    website: "https://www.bangor.ac.uk"
},
{
    id: 293,
    name: "Aberystwyth University",
    country: "UK",
    location: "Aberystwyth, Wales",
    fees: 28500,
    ranking: "#=651 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Computer Science", "Business"],
    website: "https://www.aber.ac.uk"
},
{
    id: 294,
    name: "University of Stirling",
    country: "UK",
    location: "Stirling, Scotland",
    fees: 30000,
    ranking: "#=601 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Arts", "Science", "Psychology"],
    website: "https://www.stir.ac.uk"
},
{
    id: 295,
    name: "Robert Gordon University",
    country: "UK",
    location: "Aberdeen, Scotland",
    fees: 32000,
    ranking: "#=701 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Computer Science", "Medicine"],
    website: "https://www.rgu.ac.uk"
},
{
    id: 296,
    name: "Brock University",
    country: "Canada",
    location: "St. Catharines, Ontario",
    fees: 23500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Arts", "Science", "Engineering"],
    website: "https://www.brocku.ca"
},
{
    id: 297,
    name: "Lakehead University",
    country: "Canada",
    location: "Thunder Bay, Ontario",
    fees: 22000,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Medicine", "Arts"],
    website: "https://www.lakeheadu.ca"
},
{
    id: 298,
    name: "University of Northern British Columbia",
    country: "Canada",
    location: "Prince George, British Columbia",
    fees: 20500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Arts", "Engineering", "Business"],
    website: "https://www.unbc.ca"
},
{
    id: 299,
    name: "Thompson Rivers University",
    country: "Canada",
    location: "Kamloops, British Columbia",
    fees: 21500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Business", "Arts", "Science", "Engineering"],
    website: "https://www.tru.ca"
},
{
    id: 300,
    name: "University of Regina",
    country: "Canada",
    location: "Regina, Saskatchewan",
    fees: 22500,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.uregina.ca"
},
{
    id: 301,
    name: "James Cook University",
    country: "Australia",
    location: "Townsville, Queensland",
    fees: 28000,
    ranking: "#=424 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Engineering", "Business"],
    website: "https://www.jcu.edu.au"
},
{
    id: 302,
    name: "University of Southern Queensland",
    country: "Australia",
    location: "Toowoomba, Queensland",
    fees: 26500,
    ranking: "#=601 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Science"],
    website: "https://www.usq.edu.au"
},
{
    id: 303,
    name: "Murdoch University",
    country: "Australia",
    location: "Perth, Western Australia",
    fees: 29000,
    ranking: "#=551 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Business", "Arts"],
    website: "https://www.murdoch.edu.au"
},
{
    id: 304,
    name: "Western Sydney University",
    country: "Australia",
    location: "Sydney, New South Wales",
    fees: 27500,
    ranking: "#=468 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Arts", "Engineering"],
    website: "https://www.westernsydney.edu.au"
},
{
    id: 305,
    name: "RMIT University",
    country: "Australia",
    location: "Melbourne, Victoria",
    fees: 33000,
    ranking: "#=140 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Arts"],
    website: "https://www.rmit.edu.au"
},
{
    id: 306,
    name: "University of Siegen",
    country: "Germany",
    location: "Siegen, North Rhine-Westphalia",
    fees: 2850,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Arts", "Economics"],
    website: "https://www.uni-siegen.de"
},
{
    id: 307,
    name: "University of Kassel",
    country: "Germany",
    location: "Kassel, Hesse",
    fees: 2950,
    ranking: "#=751 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Arts", "Science", "Economics"],
    website: "https://www.uni-kassel.de"
},
{
    id: 308,
    name: "University of Paderborn",
    country: "Germany",
    location: "Paderborn, North Rhine-Westphalia",
    fees: 3000,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Computer Science", "Engineering", "Business", "Arts"],
    website: "https://www.uni-paderborn.de"
},
{
    id: 309,
    name: "Chemnitz University of Technology",
    country: "Germany",
    location: "Chemnitz, Saxony",
    fees: 2800,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Economics", "Arts"],
    website: "https://www.tu-chemnitz.de"
},
{
    id: 310,
    name: "University of Rostock",
    country: "Germany",
    location: "Rostock, Mecklenburg-Vorpommern",
    fees: 2700,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.uni-rostock.de"
},
{
    id: 311,
    name: "Université de Caen Normandie",
    country: "France",
    location: "Caen, Normandy",
    fees: 2750,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.unicaen.fr"
},
{
    id: 312,
    name: "University of Perpignan",
    country: "France",
    location: "Perpignan, Occitanie",
    fees: 2650,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Arts", "Economics", "Engineering"],
    website: "https://www.univ-perp.fr"
},
{
    id: 313,
    name: "University of La Rochelle",
    country: "France",
    location: "La Rochelle, Nouvelle-Aquitaine",
    fees: 2800,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Business", "Arts"],
    website: "https://www.univ-larochelle.fr"
},
{
    id: 314,
    name: "University of Pau and Pays de l'Adour",
    country: "France",
    location: "Pau, Nouvelle-Aquitaine",
    fees: 2700,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Arts", "Economics"],
    website: "https://www.univ-pau.fr"
},
{
    id: 315,
    name: "University of Versailles Saint-Quentin",
    country: "France",
    location: "Versailles, Île-de-France",
    fees: 3400,
    ranking: "#=701 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.uvsq.fr"
},
{
    id: 316,
    name: "Stenden University of Applied Sciences",
    country: "Netherlands",
    location: "Leeuwarden",
    fees: 9800,
    ranking: "#=801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Business", "Arts", "Engineering", "Computer Science"],
    website: "https://www.nhl.nl"
},
{
    id: 317,
    name: "University of Teacher Education Lucerne",
    country: "Switzerland",
    location: "Lucerne",
    fees: 1200,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Arts", "Psychology", "Science", "Economics"],
    website: "https://www.phlu.ch"
},
{
    id: 318,
    name: "University of Music and Performing Arts Vienna",
    country: "Switzerland",
    location: "Zurich",
    fees: 2200,
    ranking: "#=801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Arts", "Music", "Psychology", "Computer Science"],
    website: "https://www.zhdk.ch"

},
{   
 id: 146,
    name: "Delft University of Technology",
    country: "Netherlands",
    location: "Delft",
    fees: 14000,
    ranking: "#52 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.tudelft.nl"
},
{
    id: 147,
    name: "Leiden University",
    country: "Netherlands",
    location: "Leiden",
    fees: 13000,
    ranking: "#109 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Law", "Medicine", "Arts", "Science"],
    website: "https://www.universiteitleiden.nl"
},
{
    id: 148,
    name: "Utrecht University",
    country: "Netherlands",
    location: "Utrecht",
    fees: 13500,
    ranking: "#69 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.uu.nl"
},
{
    id: 149,
    name: "Erasmus University Rotterdam",
    country: "Netherlands",
    location: "Rotterdam",
    fees: 12500,
    ranking: "#179 Global",
    exams: ["IELTS", "TOEFL", "PTE", "GMAT"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Economics", "Medicine", "Law"],
    website: "https://www.eur.nl"
},
{
    id: 150,
    name: "Wageningen University",
    country: "Netherlands",
    location: "Wageningen",
    fees: 13200,
    ranking: "#117 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Arts", "Economics"],
    website: "https://www.wur.nl"
},
{
    id: 151,
    name: "Eindhoven University of Technology",
    country: "Netherlands",
    location: "Eindhoven",
    fees: 14500,
    ranking: "#186 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.tue.nl"
},
{
    id: 152,
    name: "University of Groningen",
    country: "Netherlands",
    location: "Groningen",
    fees: 12800,
    ranking: "#128 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Economics"],
    website: "https://www.rug.nl"
},
{
    id: 153,
    name: "Radboud University",
    country: "Netherlands",
    location: "Nijmegen",
    fees: 12200,
    ranking: "#166 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Psychology"],
    website: "https://www.ru.nl"
},
{
    id: 154,
    name: "Tilburg University",
    country: "Netherlands",
    location: "Tilburg",
    fees: 11800,
    ranking: "#356 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Business", "Law", "Psychology"],
    website: "https://www.tilburguniversity.edu"
},
{
    id: 155,
    name: "Maastricht University",
    country: "Netherlands",
    location: "Maastricht",
    fees: 13800,
    ranking: "#103 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Law", "Business", "Arts"],
    website: "https://www.maastrichtuniversity.nl"
},
{
    id: 156,
    name: "VU Amsterdam",
    country: "Netherlands",
    location: "Amsterdam",
    fees: 12600,
    ranking: "#236 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Medicine", "Arts", "Business"],
    website: "https://www.vu.nl"
},
{
    id: 157,
    name: "Twente University",
    country: "Netherlands",
    location: "Enschede",
    fees: 12900,
    ranking: "#201 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Science"],
    website: "https://www.utwente.nl"
},
{
    id: 158,
    name: "Rotterdam University of Applied Sciences",
    country: "Netherlands",
    location: "Rotterdam",
    fees: 11500,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Business", "Engineering", "Arts", "Computer Science"],
    website: "https://www.hr.nl"
},
{
    id: 159,
    name: "The Hague University of Applied Sciences",
    country: "Netherlands",
    location: "The Hague",
    fees: 11200,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master"],
    fields: ["Business", "Engineering", "Arts", "Law"],
    website: "https://www.thehagueuniversity.com"
},
{
    id: 160,
    name: "University of Basel",
    country: "Switzerland",
    location: "Basel",
    fees: 1800,
    ranking: "#95 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.unibas.ch"
},
{
    id: 161,
    name: "University of Geneva",
    country: "Switzerland",
    location: "Geneva",
    fees: 2000,
    ranking: "#125 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Law", "Medicine", "Science", "Arts"],
    website: "https://www.unige.ch"
},
{
    id: 162,
    name: "University of Bern",
    country: "Switzerland",
    location: "Bern",
    fees: 1700,
    ranking: "#119 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.unibe.ch"
},
{
    id: 163,
    name: "University of Lausanne",
    country: "Switzerland",
    location: "Lausanne",
    fees: 1900,
    ranking: "#176 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Economics"],
    website: "https://www.unil.ch"
},
{
    id: 164,
    name: "École polytechnique fédérale de Lausanne",
    country: "Switzerland",
    location: "Lausanne",
    fees: 1600,
    ranking: "#14 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.epfl.ch"
},
{
    id: 165,
    name: "University of Zurich",
    country: "Switzerland",
    location: "Zurich",
    fees: 1800,
    ranking: "#70 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Economics"],
    website: "https://www.uzh.ch"
},
{
    id: 166,
    name: "University of St. Gallen",
    country: "Switzerland",
    location: "St. Gallen",
    fees: 2500,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE", "GMAT"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Economics", "Law", "Accounting"],
    website: "https://www.unisg.ch"
},
{
    id: 167,
    name: "University of Fribourg",
    country: "Switzerland",
    location: "Fribourg",
    fees: 1650,
    ranking: "#501 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Medicine", "Law"],
    website: "https://www.unifr.ch"
},
{
    id: 168,
    name: "University of Neuchâtel",
    country: "Switzerland",
    location: "Neuchâtel",
    fees: 1550,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Law", "Economics"],
    website: "https://www.unine.ch"
},
{
    id: 169,
    name: "University of Lucerne",
    country: "Switzerland",
    location: "Lucerne",
    fees: 1750,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Law", "Arts", "Economics", "Medicine"],
    website: "https://www.unilu.ch"
},
{
    id: 170,
    name: "Fudan University",
    country: "China",
    location: "Shanghai",
    fees: 8500,
    ranking: "#34 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Economics", "Science", "Business"],
    website: "https://www.fudan.edu.cn"
},
{
    id: 171,
    name: "Zhejiang University",
    country: "China",
    location: "Hangzhou, Zhejiang",
    fees: 7800,
    ranking: "#42 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Medicine", "Science"],
    website: "https://www.zju.edu.cn"
},
{
    id: 172,
    name: "University of Science and Technology of China",
    country: "China",
    location: "Hefei, Anhui",
    fees: 7200,
    ranking: "#89 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Computer Science", "Physics"],
    website: "https://www.ustc.edu.cn"
},
{
    id: 173,
    name: "Nanjing University",
    country: "China",
    location: "Nanjing, Jiangsu",
    fees: 7000,
    ranking: "#114 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Arts", "Engineering", "Medicine"],
    website: "https://www.nju.edu.cn"
},
{
    id: 174,
    name: "Sun Yat-sen University",
    country: "China",
    location: "Guangzhou, Guangdong",
    fees: 7500,
    ranking: "#108 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Business"],
    website: "https://www.sysu.edu.cn"
},
{
    id: 175,
    name: "Wuhan University",
    country: "China",
    location: "Wuhan, Hubei",
    fees: 6800,
    ranking: "#176 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Medicine", "Arts"],
    website: "https://www.whu.edu.cn"
},
{
    id: 176,
    name: "Huazhong University of Science and Technology",
    country: "China",
    location: "Wuhan, Hubei",
    fees: 7100,
    ranking: "#153 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Computer Science", "Science"],
    website: "https://www.hust.edu.cn"
},
{
    id: 177,
    name: "Xi'an Jiaotong University",
    country: "China",
    location: "Xi'an, Shaanxi",
    fees: 6900,
    ranking: "#292 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Business"],
    website: "https://www.xjtu.edu.cn"
},
{
    id: 178,
    name: "Harbin Institute of Technology",
    country: "China",
    location: "Harbin, Heilongjiang",
    fees: 6500,
    ranking: "#236 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.hit.edu.cn"
},
{
    id: 179,
    name: "Beihang University",
    country: "China",
    location: "Beijing",
    fees: 7300,
    ranking: "#383 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.buaa.edu.cn"
},
{
    id: 180,
    name: "Beijing Institute of Technology",
    country: "China",
    location: "Beijing",
    fees: 7000,
    ranking: "#364 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.bit.edu.cn"
},
{
    id: 181,
    name: "Tongji University",
    country: "China",
    location: "Shanghai",
    fees: 7600,
    ranking: "#212 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Arts"],
    website: "https://www.tongji.edu.cn"
},
{
    id: 182,
    name: "Southeast University",
    country: "China",
    location: "Nanjing, Jiangsu",
    fees: 6700,
    ranking: "#415 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Arts"],
    website: "https://www.seu.edu.cn"
},
{
    id: 183,
    name: "Dalian University of Technology",
    country: "China",
    location: "Dalian, Liaoning",
    fees: 6400,
    ranking: "#551 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Business"],
    website: "https://www.dlut.edu.cn"
},
{
    id: 184,
    name: "South China University of Technology",
    country: "China",
    location: "Guangzhou, Guangdong",
    fees: 6600,
    ranking: "#406 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.scut.edu.cn"
},
{
    id: 185,
    name: "Central South University",
    country: "China",
    location: "Changsha, Hunan",
    fees: 6300,
    ranking: "#406 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.csu.edu.cn"
},
{
    id: 186,
    name: "Sichuan University",
    country: "China",
    location: "Chengdu, Sichuan",
    fees: 6200,
    ranking: "#451 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.scu.edu.cn"
},
{
    id: 187,
    name: "University of Electronic Science and Technology of China",
    country: "China",
    location: "Chengdu, Sichuan",
    fees: 6800,
    ranking: "#651 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.uestc.edu.cn"
},
{
    id: 188,
    name: "Beijing University of Posts and Telecommunications",
    country: "China",
    location: "Beijing",
    fees: 6900,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Computer Science", "Engineering", "Science", "Business"],
    website: "https://www.bupt.edu.cn"
},
{
    id: 189,
    name: "China University of Mining and Technology",
    country: "China",
    location: "Xuzhou, Jiangsu",
    fees: 5800,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Business"],
    website: "https://www.cumt.edu.cn"
},
{
    id: 190,
    name: "Northeastern University",
    country: "China",
    location: "Shenyang, Liaoning",
    fees: 6000,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.neu.edu.cn"
},
{
    id: 191,
    name: "East China University of Science and Technology",
    country: "China",
    location: "Shanghai",
    fees: 7400,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Business"],
    website: "https://www.ecust.edu.cn"
},
{
    id: 192,
    name: "Beijing Normal University",
    country: "China",
    location: "Beijing",
    fees: 7200,
    ranking: "#270 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Psychology", "Medicine"],
    website: "https://www.bnu.edu.cn"
},
{
    id: 193,
    name: "East China Normal University",
    country: "China",
    location: "Shanghai",
    fees: 7100,
    ranking: "#601 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Psychology", "Medicine"],
    website: "https://www.ecnu.edu.cn"
},
{
    id: 194,
    name: "China Agricultural University",
    country: "China",
    location: "Beijing",
    fees: 6500,
    ranking: "#651 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Medicine", "Business"],
    website: "https://www.cau.edu.cn"
},
{
    id: 195,
    name: "Jilin University",
    country: "China",
    location: "Changchun, Jilin",
    fees: 5900,
    ranking: "#501 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.jlu.edu.cn"
},
{
    id: 196,
    name: "Lanzhou University",
    country: "China",
    location: "Lanzhou, Gansu",
    fees: 5500,
    ranking: "#571 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Medicine", "Arts"],
    website: "https://www.lzu.edu.cn"
},
{
    id: 197,
    name: "Ocean University of China",
    country: "China",
    location: "Qingdao, Shandong",
    fees: 6100,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Medicine", "Arts"],
    website: "https://www.ouc.edu.cn"
},
{
    id: 198,
    name: "China University of Geosciences",
    country: "China",
    location: "Wuhan, Hubei",
    fees: 5700,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Computer Science", "Arts"],
    website: "https://www.cug.edu.cn"
},
{
    id: 199,
    name: "Renmin University of China",
    country: "China",
    location: "Beijing",
    fees: 8000,
    ranking: "#601 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Law", "Business", "Arts"],
    website: "https://www.ruc.edu.cn"
},
{
    id: 200,
    name: "Central University of Finance and Economics",
    country: "China",
    location: "Beijing",
    fees: 7800,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Business", "Accounting", "Law"],
    website: "https://www.cufe.edu.cn"
},
{
    id: 201,
    name: "University of International Business and Economics",
    country: "China",
    location: "Beijing",
    fees: 7600,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Economics", "Law", "Arts"],
    website: "https://www.uibe.edu.cn"
},
{
    id: 202,
    name: "Southwest University",
    country: "China",
    location: "Chongqing",
    fees: 6000,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Medicine", "Engineering"],
    website: "https://www.swu.edu.cn"
},
{
    id: 203,
    name: "Northwest University",
    country: "China",
    location: "Xi'an, Shaanxi",
    fees: 5600,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Arts", "Engineering", "Medicine"],
    website: "https://www.nwu.edu.cn"
},
{
    id: 204,
    name: "Xiamen University",
    country: "China",
    location: "Xiamen, Fujian",
    fees: 7000,
    ranking: "#432 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Science", "Arts", "Medicine"],
    website: "https://www.xmu.edu.cn"
},
{
    id: 205,
    name: "Tianjin University",
    country: "China",
    location: "Tianjin",
    fees: 6800,
    ranking: "#317 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Business"],
    website: "https://www.tju.edu.cn"
},
{
    id: 206,
    name: "Northwestern Polytechnical University",
    country: "China",
    location: "Xi'an, Shaanxi",
    fees: 6700,
    ranking: "#531 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.nwpu.edu.cn"
},
{
    id: 207,
    name: "University of Science and Technology Beijing",
    country: "China",
    location: "Beijing",
    fees: 6600,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Business"],
    website: "https://www.ustb.edu.cn"
},
{
    id: 208,
    name: "China University of Petroleum",
    country: "China",
    location: "Beijing",
    fees: 6200,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Business"],
    website: "https://www.cup.edu.cn"
},
{
    id: 209,
    name: "Hefei University of Technology",
    country: "China",
    location: "Hefei, Anhui",
    fees: 5800,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.hfut.edu.cn"
},
{
    id: 210,
    name: "Hohai University",
    country: "China",
    location: "Nanjing, Jiangsu",
    fees: 6000,
    ranking: "#801 Global",
    exams: ["TOEFL", "IELTS", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Arts"],
    website: "https://www.hhu.edu.cn"
},

{
    id: 19,
    name: "University College London",
    country: "UK",
    location: "London, England",
    fees: 46000,
    ranking: "#9 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Psychology"],
    website: "https://www.ucl.ac.uk"
},
{
    id: 20,
    name: "London School of Economics",
    country: "UK",
    location: "London, England",
    fees: 48000,
    ranking: "#45 Global",
    exams: ["IELTS", "TOEFL", "PTE", "GMAT"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Business", "Law", "Accounting"],
    website: "https://www.lse.ac.uk"
},
{
    id: 21,
    name: "King's College London",
    country: "UK",
    location: "London, England",
    fees: 44000,
    ranking: "#35 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Law", "Arts", "Psychology"],
    website: "https://www.kcl.ac.uk"
},
{
    id: 22,
    name: "University of Edinburgh",
    country: "UK",
    location: "Edinburgh, Scotland",
    fees: 42000,
    ranking: "#28 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Science"],
    website: "https://www.ed.ac.uk"
},
{
    id: 23,
    name: "University of Manchester",
    country: "UK",
    location: "Manchester, England",
    fees: 40000,
    ranking: "#55 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Medicine"],
    website: "https://www.manchester.ac.uk"
},
{
    id: 24,
    name: "University of Warwick",
    country: "UK",
    location: "Coventry, England",
    fees: 41000,
    ranking: "#61 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Engineering", "Economics", "Computer Science"],
    website: "https://www.warwick.ac.uk"
},
{
    id: 25,
    name: "University of Bristol",
    country: "UK",
    location: "Bristol, England",
    fees: 39000,
    ranking: "#62 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Arts"],
    website: "https://www.bristol.ac.uk"
},
{
    id: 26,
    name: "University of Glasgow",
    country: "UK",
    location: "Glasgow, Scotland",
    fees: 38000,
    ranking: "#77 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Business"],
    website: "https://www.gla.ac.uk"
},
{
    id: 27,
    name: "University of Birmingham",
    country: "UK",
    location: "Birmingham, England",
    fees: 37000,
    ranking: "#84 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Arts"],
    website: "https://www.birmingham.ac.uk"
},
{
    id: 28,
    name: "University of Sheffield",
    country: "UK",
    location: "Sheffield, England",
    fees: 36000,
    ranking: "#104 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Arts", "Science"],
    website: "https://www.sheffield.ac.uk"
},
{
    id: 29,
    name: "University of Nottingham",
    country: "UK",
    location: "Nottingham, England",
    fees: 35000,
    ranking: "#114 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Arts"],
    website: "https://www.nottingham.ac.uk"
},
{
    id: 30,
    name: "University of Leeds",
    country: "UK",
    location: "Leeds, England",
    fees: 34000,
    ranking: "#92 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Arts"],
    website: "https://www.leeds.ac.uk"
},
{
    id: 31,
    name: "University of Southampton",
    country: "UK",
    location: "Southampton, England",
    fees: 38500,
    ranking: "#97 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Medicine", "Science"],
    website: "https://www.southampton.ac.uk"
},
{
    id: 32,
    name: "University of Liverpool",
    country: "UK",
    location: "Liverpool, England",
    fees: 33000,
    ranking: "#178 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Science"],
    website: "https://www.liverpool.ac.uk"
},
{
    id: 33,
    name: "University of Newcastle",
    country: "UK",
    location: "Newcastle, England",
    fees: 32000,
    ranking: "#139 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Science"],
    website: "https://www.ncl.ac.uk"
},
{
    id: 34,
    name: "University of York",
    country: "UK",
    location: "York, England",
    fees: 35500,
    ranking: "#162 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Computer Science", "Psychology", "Arts", "Science"],
    website: "https://www.york.ac.uk"
},
{
    id: 35,
    name: "Cardiff University",
    country: "UK",
    location: "Cardiff, Wales",
    fees: 34500,
    ranking: "#166 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Business"],
    website: "https://www.cardiff.ac.uk"
},
{
    id: 36,
    name: "Queen Mary University of London",
    country: "UK",
    location: "London, England",
    fees: 43000,
    ranking: "#145 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Law", "Arts"],
    website: "https://www.qmul.ac.uk"
},
{
    id: 37,
    name: "University of Exeter",
    country: "UK",
    location: "Exeter, England",
    fees: 36500,
    ranking: "#163 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Medicine", "Engineering", "Arts"],
    website: "https://www.exeter.ac.uk"
},
{
    id: 38,
    name: "University of Bath",
    country: "UK",
    location: "Bath, England",
    fees: 37500,
    ranking: "#179 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Computer Science", "Science"],
    website: "https://www.bath.ac.uk"
},
{
    id: 39,
    name: "University of Reading",
    country: "UK",
    location: "Reading, England",
    fees: 31000,
    ranking: "#202 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Psychology", "Arts", "Science"],
    website: "https://www.reading.ac.uk"
},
{
    id: 40,
    name: "Yale University",
    country: "USA",
    location: "New Haven, Connecticut",
    fees: 57000,
    ranking: "#11 Global",
    exams: ["TOEFL", "SAT", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Law", "Medicine", "Arts", "Business"],
    website: "https://www.yale.edu"
},
{
    id: 41,
    name: "Princeton University",
    country: "USA",
    location: "Princeton, New Jersey",
    fees: 55000,
    ranking: "#13 Global",
    exams: ["TOEFL", "SAT", "PTE", "GRE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Economics", "Science", "Arts"],
    website: "https://www.princeton.edu"
},
{
    id: 42,
    name: "Columbia University",
    country: "USA",
    location: "New York, New York",
    fees: 58000,
    ranking: "#19 Global",
    exams: ["TOEFL", "GRE", "GMAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Medicine", "Engineering", "Law"],
    website: "https://www.columbia.edu"
},
{
    id: 43,
    name: "University of Chicago",
    country: "USA",
    location: "Chicago, Illinois",
    fees: 59000,
    ranking: "#15 Global",
    exams: ["TOEFL", "GRE", "GMAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Business", "Medicine", "Law"],
    website: "https://www.uchicago.edu"
},
{
    id: 44,
    name: "University of Pennsylvania",
    country: "USA",
    location: "Philadelphia, Pennsylvania",
    fees: 56000,
    ranking: "#16 Global",
    exams: ["TOEFL", "GRE", "GMAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Medicine", "Engineering", "Law"],
    website: "https://www.upenn.edu"
},
{
    id: 45,
    name: "University of California, Berkeley",
    country: "USA",
    location: "Berkeley, California",
    fees: 52000,
    ranking: "#22 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Science"],
    website: "https://www.berkeley.edu"
},
{
    id: 46,
    name: "University of California, Los Angeles",
    country: "USA",
    location: "Los Angeles, California",
    fees: 53000,
    ranking: "#24 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Arts", "Business"],
    website: "https://www.ucla.edu"
},
{
    id: 47,
    name: "Duke University",
    country: "USA",
    location: "Durham, North Carolina",
    fees: 57500,
    ranking: "#25 Global",
    exams: ["TOEFL", "SAT", "GRE", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Engineering", "Law"],
    website: "https://www.duke.edu"
},
{
    id: 48,
    name: "Cornell University",
    country: "USA",
    location: "Ithaca, New York",
    fees: 56500,
    ranking: "#21 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Arts"],
    website: "https://www.cornell.edu"
},
{
    id: 49,
    name: "Northwestern University",
    country: "USA",
    location: "Evanston, Illinois",
    fees: 58500,
    ranking: "#30 Global",
    exams: ["TOEFL", "GRE", "GMAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Medicine", "Engineering", "Arts"],
    website: "https://www.northwestern.edu"
},
{
    id: 50,
    name: "Johns Hopkins University",
    country: "USA",
    location: "Baltimore, Maryland",
    fees: 57200,
    ranking: "#31 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Business"],
    website: "https://www.jhu.edu"
},
{
    id: 51,
    name: "University of Michigan",
    country: "USA",
    location: "Ann Arbor, Michigan",
    fees: 51000,
    ranking: "#23 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Medicine", "Arts"],
    website: "https://www.umich.edu"
},
{
    id: 52,
    name: "New York University",
    country: "USA",
    location: "New York, New York",
    fees: 56000,
    ranking: "#39 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Arts", "Medicine", "Law"],
    website: "https://www.nyu.edu"
},
{
    id: 53,
    name: "Carnegie Mellon University",
    country: "USA",
    location: "Pittsburgh, Pennsylvania",
    fees: 57000,
    ranking: "#51 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Computer Science", "Engineering", "Business", "Arts"],
    website: "https://www.cmu.edu"
},
{
    id: 54,
    name: "University of California, San Diego",
    country: "USA",
    location: "San Diego, California",
    fees: 50000,
    ranking: "#38 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Computer Science"],
    website: "https://www.ucsd.edu"
},
{
    id: 55,
    name: "University of Washington",
    country: "USA",
    location: "Seattle, Washington",
    fees: 49000,
    ranking: "#59 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Computer Science", "Business"],
    website: "https://www.washington.edu"
},
{
    id: 56,
    name: "Georgia Institute of Technology",
    country: "USA",
    location: "Atlanta, Georgia",
    fees: 48000,
    ranking: "#88 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Business"],
    website: "https://www.gatech.edu"
},
{
    id: 57,
    name: "University of Texas at Austin",
    country: "USA",
    location: "Austin, Texas",
    fees: 47000,
    ranking: "#67 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Computer Science", "Arts"],
    website: "https://www.utexas.edu"
},
{
    id: 58,
    name: "University of Wisconsin-Madison",
    country: "USA",
    location: "Madison, Wisconsin",
    fees: 46000,
    ranking: "#72 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Science"],
    website: "https://www.wisc.edu"
},
{
    id: 59,
    name: "University of Illinois at Urbana-Champaign",
    country: "USA",
    location: "Urbana, Illinois",
    fees: 48500,
    ranking: "#85 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Science"],
    website: "https://www.illinois.edu"
},
{
    id: 60,
    name: "University of North Carolina at Chapel Hill",
    country: "USA",
    location: "Chapel Hill, North Carolina",
    fees: 45000,
    ranking: "#90 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Arts", "Science"],
    website: "https://www.unc.edu"
},
{
    id: 61,
    name: "Boston University",
    country: "USA",
    location: "Boston, Massachusetts",
    fees: 54000,
    ranking: "#110 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Engineering", "Arts"],
    website: "https://www.bu.edu"
},
{
    id: 62,
    name: "University of Southern California",
    country: "USA",
    location: "Los Angeles, California",
    fees: 58000,
    ranking: "#112 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Arts", "Medicine"],
    website: "https://www.usc.edu"
},
{
    id: 63,
    name: "Vanderbilt University",
    country: "USA",
    location: "Nashville, Tennessee",
    fees: 56500,
    ranking: "#118 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Arts"],
    website: "https://www.vanderbilt.edu"
},
{
    id: 64,
    name: "Rice University",
    country: "USA",
    location: "Houston, Texas",
    fees: 54500,
    ranking: "#124 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Science", "Arts"],
    website: "https://www.rice.edu"
},
{
    id: 65,
    name: "Emory University",
    country: "USA",
    location: "Atlanta, Georgia",
    fees: 55000,
    ranking: "#130 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Arts", "Law"],
    website: "https://www.emory.edu"
},
{
    id: 66,
    name: "University of California, Davis",
    country: "USA",
    location: "Davis, California",
    fees: 48800,
    ranking: "#102 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Business"],
    website: "https://www.ucdavis.edu"
},
{
    id: 67,
    name: "University of California, Santa Barbara",
    country: "USA",
    location: "Santa Barbara, California",
    fees: 47500,
    ranking: "#146 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Arts", "Computer Science"],
    website: "https://www.ucsb.edu"
},
{
    id: 68,
    name: "Purdue University",
    country: "USA",
    location: "West Lafayette, Indiana",
    fees: 46500,
    ranking: "#129 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Science"],
    website: "https://www.purdue.edu"
},
{
    id: 69,
    name: "Ohio State University",
    country: "USA",
    location: "Columbus, Ohio",
    fees: 45000,
    ranking: "#140 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Arts"],
    website: "https://www.osu.edu"
},
{
    id: 70,
    name: "Pennsylvania State University",
    country: "USA",
    location: "University Park, Pennsylvania",
    fees: 44000,
    ranking: "#144 Global",
    exams: ["TOEFL", "GRE", "SAT", "PTE"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Medicine", "Arts"],
    website: "https://www.psu.edu"
},
{
    id: 71,
    name: "University of British Columbia",
    country: "Canada",
    location: "Vancouver, British Columbia",
    fees: 33000,
    ranking: "#37 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Science"],
    website: "https://www.ubc.ca"
},
{
    id: 72,
    name: "University of Waterloo",
    country: "Canada",
    location: "Waterloo, Ontario",
    fees: 34000,
    ranking: "#149 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Mathematics", "Business"],
    website: "https://uwaterloo.ca"
},
{
    id: 73,
    name: "University of Alberta",
    country: "Canada",
    location: "Edmonton, Alberta",
    fees: 30000,
    ranking: "#110 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Science"],
    website: "https://www.ualberta.ca"
},
{
    id: 74,
    name: "McMaster University",
    country: "Canada",
    location: "Hamilton, Ontario",
    fees: 31000,
    ranking: "#144 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Science"],
    website: "https://www.mcmaster.ca"
},
{
    id: 75,
    name: "Queen's University",
    country: "Canada",
    location: "Kingston, Ontario",
    fees: 32000,
    ranking: "#209 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Engineering", "Medicine", "Arts"],
    website: "https://www.queensu.ca"
},
{
    id: 76,
    name: "University of Calgary",
    country: "Canada",
    location: "Calgary, Alberta",
    fees: 29000,
    ranking: "#242 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Science"],
    website: "https://www.ucalgary.ca"
},
{
    id: 77,
    name: "University of Ottawa",
    country: "Canada",
    location: "Ottawa, Ontario",
    fees: 28000,
    ranking: "#279 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Law", "Arts"],
    website: "https://www.uottawa.ca"
},
{
    id: 78,
    name: "Western University",
    country: "Canada",
    location: "London, Ontario",
    fees: 30500,
    ranking: "#203 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Engineering", "Arts"],
    website: "https://www.uwo.ca"
},
{
    id: 79,
    name: "University of Victoria",
    country: "Canada",
    location: "Victoria, British Columbia",
    fees: 27000,
    ranking: "#359 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Science", "Arts"],
    website: "https://www.uvic.ca"
},
{
    id: 80,
    name: "Simon Fraser University",
    country: "Canada",
    location: "Burnaby, British Columbia",
    fees: 26000,
    ranking: "#323 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Computer Science", "Business", "Engineering", "Arts"],
    website: "https://www.sfu.ca"
},
{
    id: 81,
    name: "Dalhousie University",
    country: "Canada",
    location: "Halifax, Nova Scotia",
    fees: 25000,
    ranking: "#308 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.dal.ca"
},
{
    id: 82,
    name: "University of Manitoba",
    country: "Canada",
    location: "Winnipeg, Manitoba",
    fees: 24000,
    ranking: "#601 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Arts"],
    website: "https://www.umanitoba.ca"
},
{
    id: 83,
    name: "University of Saskatchewan",
    country: "Canada",
    location: "Saskatoon, Saskatchewan",
    fees: 23000,
    ranking: "#461 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Arts"],
    website: "https://www.usask.ca"
},
{
    id: 84,
    name: "Memorial University of Newfoundland",
    country: "Canada",
    location: "St. John's, Newfoundland",
    fees: 22000,
    ranking: "#701 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Arts"],
    website: "https://www.mun.ca"
},
{
    id: 85,
    name: "Carleton University",
    country: "Canada",
    location: "Ottawa, Ontario",
    fees: 26500,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Arts"],
    website: "https://www.carleton.ca"
},
{
    id: 86,
    name: "York University",
    country: "Canada",
    location: "Toronto, Ontario",
    fees: 27500,
    ranking: "#481 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Arts", "Engineering", "Law"],
    website: "https://www.yorku.ca"
},
{
    id: 87,
    name: "Concordia University",
    country: "Canada",
    location: "Montreal, Quebec",
    fees: 25500,
    ranking: "#521 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Computer Science", "Arts"],
    website: "https://www.concordia.ca"
},
{
    id: 88,
    name: "University of Guelph",
    country: "Canada",
    location: "Guelph, Ontario",
    fees: 28500,
    ranking: "#571 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Engineering", "Business", "Arts"],
    website: "https://www.uoguelph.ca"
},
{
    id: 89,
    name: "Ryerson University",
    country: "Canada",
    location: "Toronto, Ontario",
    fees: 29500,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Computer Science", "Arts"],
    website: "https://www.ryerson.ca"
},
{
    id: 90,
    name: "University of Windsor",
    country: "Canada",
    location: "Windsor, Ontario",
    fees: 24500,
    ranking: "#801 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Science", "Arts"],
    website: "https://www.uwindsor.ca"
},
{
    id: 91,
    name: "University of Sydney",
    country: "Australia",
    location: "Sydney, New South Wales",
    fees: 41000,
    ranking: "#41 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Arts"],
    website: "https://www.sydney.edu.au"
},
{
    id: 92,
    name: "University of Queensland",
    country: "Australia",
    location: "Brisbane, Queensland",
    fees: 39000,
    ranking: "#47 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Business"],
    website: "https://www.uq.edu.au"
},
{
    id: 93,
    name: "Monash University",
    country: "Australia",
    location: "Melbourne, Victoria",
    fees: 37000,
    ranking: "#57 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Business", "Arts"],
    website: "https://www.monash.edu"
},
{
    id: 94,
    name: "University of New South Wales",
    country: "Australia",
    location: "Sydney, New South Wales",
    fees: 40000,
    ranking: "#43 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Business", "Science"],
    website: "https://www.unsw.edu.au"
},
{
    id: 95,
    name: "University of Western Australia",
    country: "Australia",
    location: "Perth, Western Australia",
    fees: 36000,
    ranking: "#86 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Business"],
    website: "https://www.uwa.edu.au"
},
{
    id: 96,
    name: "University of Adelaide",
    country: "Australia",
    location: "Adelaide, South Australia",
    fees: 35000,
    ranking: "#106 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.adelaide.edu.au"
},
{
    id: 97,
    name: "Macquarie University",
    country: "Australia",
    location: "Sydney, New South Wales",
    fees: 34000,
    ranking: "#195 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Science", "Arts", "Engineering"],
    website: "https://www.mq.edu.au"
},
{
    id: 98,
    name: "Queensland University of Technology",
    country: "Australia",
    location: "Brisbane, Queensland",
    fees: 33000,
    ranking: "#213 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Computer Science", "Arts"],
    website: "https://www.qut.edu.au"
},
{
    id: 99,
    name: "University of Technology Sydney",
    country: "Australia",
    location: "Sydney, New South Wales",
    fees: 35500,
    ranking: "#133 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Arts"],
    website: "https://www.uts.edu.au"
},
{
    id: 100,
    name: "Curtin University",
    country: "Australia",
    location: "Perth, Western Australia",
    fees: 32000,
    ranking: "#193 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Business", "Science", "Arts"],
    website: "https://www.curtin.edu.au"
},
{
    id: 101,
    name: "Deakin University",
    country: "Australia",
    location: "Melbourne, Victoria",
    fees: 31000,
    ranking: "#266 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Engineering", "Arts", "Science"],
    website: "https://www.deakin.edu.au"
},
{
    id: 102,
    name: "Griffith University",
    country: "Australia",
    location: "Brisbane, Queensland",
    fees: 30000,
    ranking: "#290 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Business", "Arts", "Engineering"],
    website: "https://www.griffith.edu.au"
},
{
    id: 103,
    name: "University of Newcastle",
    country: "Australia",
    location: "Newcastle, New South Wales",
    fees: 31500,
    ranking: "#197 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Medicine", "Science", "Arts"],
    website: "https://www.newcastle.edu.au"
},
{
    id: 104,
    name: "University of Wollongong",
    country: "Australia",
    location: "Wollongong, New South Wales",
    fees: 30500,
    ranking: "#185 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Science"],
    website: "https://www.uow.edu.au"
},
{
    id: 105,
    name: "Flinders University",
    country: "Australia",
    location: "Adelaide, South Australia",
    fees: 29000,
    ranking: "#424 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.flinders.edu.au"
},
{
    id: 106,
    name: "La Trobe University",
    country: "Australia",
    location: "Melbourne, Victoria",
    fees: 28500,
    ranking: "#351 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Business", "Science", "Arts", "Engineering"],
    website: "https://www.latrobe.edu.au"
},
{
    id: 107,
    name: "Swinburne University of Technology",
    country: "Australia",
    location: "Melbourne, Victoria",
    fees: 32500,
    ranking: "#321 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Business", "Arts"],
    website: "https://www.swinburne.edu.au"
},
{
    id: 108,
    name: "University of Tasmania",
    country: "Australia",
    location: "Hobart, Tasmania",
    fees: 27000,
    ranking: "#293 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Medicine", "Arts", "Engineering"],
    website: "https://www.utas.edu.au"
},
{
    id: 109,
    name: "Charles Darwin University",
    country: "Australia",
    location: "Darwin, Northern Territory",
    fees: 26000,
    ranking: "#651 Global",
    exams: ["IELTS", "TOEFL", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Arts", "Business"],
    website: "https://www.cdu.edu.au"
},
{
    id: 110,
    name: "Ludwig Maximilian University",
    country: "Germany",
    location: "Munich, Bavaria",
    fees: 3500,
    ranking: "#64 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.uni-muenchen.de"
},
{
    id: 111,
    name: "Heidelberg University",
    country: "Germany",
    location: "Heidelberg, Baden-Württemberg",
    fees: 3200,
    ranking: "#65 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.uni-heidelberg.de"
},
{
    id: 112,
    name: "Humboldt University",
    country: "Germany",
    location: "Berlin",
    fees: 3000,
    ranking: "#87 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Medicine", "Economics"],
    website: "https://www.hu-berlin.de"
},
{
    id: 113,
    name: "University of Göttingen",
    country: "Germany",
    location: "Göttingen, Lower Saxony",
    fees: 3100,
    ranking: "#134 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Medicine", "Arts", "Law"],
    website: "https://www.uni-goettingen.de"
},
{
    id: 114,
    name: "University of Freiburg",
    country: "Germany",
    location: "Freiburg, Baden-Württemberg",
    fees: 3300,
    ranking: "#169 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Engineering", "Arts"],
    website: "https://www.uni-freiburg.de"
},
{
    id: 115,
    name: "Free University of Berlin",
    country: "Germany",
    location: "Berlin",
    fees: 3200,
    ranking: "#118 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Medicine", "Law"],
    website: "https://www.fu-berlin.de"
},
{
    id: 116,
    name: "RWTH Aachen University",
    country: "Germany",
    location: "Aachen, North Rhine-Westphalia",
    fees: 3400,
    ranking: "#107 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Medicine"],
    website: "https://www.rwth-aachen.de"
},
{
    id: 117,
    name: "University of Hamburg",
    country: "Germany",
    location: "Hamburg",
    fees: 3100,
    ranking: "#205 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.uni-hamburg.de"
},
{
    id: 118,
    name: "University of Cologne",
    country: "Germany",
    location: "Cologne, North Rhine-Westphalia",
    fees: 3000,
    ranking: "#145 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Economics", "Medicine", "Law"],
    website: "https://www.uni-koeln.de"
},
{
    id: 119,
    name: "University of Tübingen",
    country: "Germany",
    location: "Tübingen, Baden-Württemberg",
    fees: 3200,
    ranking: "#177 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.uni-tuebingen.de"
},
{
    id: 120,
    name: "University of Bonn",
    country: "Germany",
    location: "Bonn, North Rhine-Westphalia",
    fees: 3150,
    ranking: "#113 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Medicine", "Arts", "Economics"],
    website: "https://www.uni-bonn.de"
},
{
    id: 121,
    name: "University of Würzburg",
    country: "Germany",
    location: "Würzburg, Bavaria",
    fees: 3000,
    ranking: "#194 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Psychology"],
    website: "https://www.uni-wuerzburg.de"
},
{
    id: 122,
    name: "University of Frankfurt",
    country: "Germany",
    location: "Frankfurt, Hesse",
    fees: 3300,
    ranking: "#192 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Medicine", "Arts", "Law"],
    website: "https://www.uni-frankfurt.de"
},
{
    id: 123,
    name: "University of Stuttgart",
    country: "Germany",
    location: "Stuttgart, Baden-Württemberg",
    fees: 3500,
    ranking: "#279 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Arts"],
    website: "https://www.uni-stuttgart.de"
},
{
    id: 124,
    name: "University of Münster",
    country: "Germany",
    location: "Münster, North Rhine-Westphalia",
    fees: 3100,
    ranking: "#283 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.uni-muenster.de"
},
{
    id: 125,
    name: "Dresden University of Technology",
    country: "Germany",
    location: "Dresden, Saxony",
    fees: 3200,
    ranking: "#173 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Medicine"],
    website: "https://www.tu-dresden.de"
},
{
    id: 126,
    name: "Karlsruhe Institute of Technology",
    country: "Germany",
    location: "Karlsruhe, Baden-Württemberg",
    fees: 3400,
    ranking: "#141 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.kit.edu"
},
{
    id: 127,
    name: "University of Erlangen-Nuremberg",
    country: "Germany",
    location: "Erlangen, Bavaria",
    fees: 3000,
    ranking: "#319 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.fau.de"
},
{
    id: 128,
    name: "University of Leipzig",
    country: "Germany",
    location: "Leipzig, Saxony",
    fees: 2900,
    ranking: "#496 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Arts", "Science", "Psychology"],
    website: "https://www.uni-leipzig.de"
},
{
    id: 129,
    name: "University of Kiel",
    country: "Germany",
    location: "Kiel, Schleswig-Holstein",
    fees: 3050,
    ranking: "#287 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.uni-kiel.de"
},
{
    id: 130,
    name: "Pierre and Marie Curie University",
    country: "France",
    location: "Paris",
    fees: 4200,
    ranking: "#123 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Medicine", "Engineering", "Computer Science"],
    website: "https://www.sorbonne-universite.fr"
},
{
    id: 131,
    name: "École Normale Supérieure",
    country: "France",
    location: "Paris",
    fees: 4500,
    ranking: "#78 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Arts", "Science", "Mathematics", "Physics"],
    website: "https://www.ens.psl.eu"
},
{
    id: 132,
    name: "University of Strasbourg",
    country: "France",
    location: "Strasbourg, Alsace",
    fees: 3800,
    ranking: "#101 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Law"],
    website: "https://www.unistra.fr"
},
{
    id: 133,
    name: "University of Lyon",
    country: "France",
    location: "Lyon, Auvergne-Rhône-Alpes",
    fees: 3600,
    ranking: "#156 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Engineering", "Business"],
    website: "https://www.univ-lyon1.fr"
},
{
    id: 134,
    name: "École Polytechnique",
    country: "France",
    location: "Palaiseau, Île-de-France",
    fees: 5000,
    ranking: "#93 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Mathematics", "Computer Science"],
    website: "https://www.polytechnique.edu"
},
{
    id: 135,
    name: "CentraleSupélec",
    country: "France",
    location: "Paris",
    fees: 4800,
    ranking: "#138 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.centralesupelec.fr"
},
{
    id: 136,
    name: "University of Bordeaux",
    country: "France",
    location: "Bordeaux, Nouvelle-Aquitaine",
    fees: 3700,
    ranking: "#130 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.u-bordeaux.fr"
},
{
    id: 137,
    name: "University of Montpellier",
    country: "France",
    location: "Montpellier, Occitanie",
    fees: 3500,
    ranking: "#195 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.umontpellier.fr"
},
{
    id: 138,
    name: "University of Toulouse",
    country: "France",
    location: "Toulouse, Occitanie",
    fees: 3600,
    ranking: "#312 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Medicine", "Arts"],
    website: "https://www.univ-toulouse.fr"
},
{
    id: 139,
    name: "University of Nice Sophia Antipolis",
    country: "France",
    location: "Nice, Provence-Alpes-Côte d'Azur",
    fees: 3400,
    ranking: "#434 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Science", "Medicine", "Arts", "Computer Science"],
    website: "https://www.univ-cotedazur.fr"
},
{
    id: 140,
    name: "University of Grenoble Alpes",
    country: "France",
    location: "Grenoble, Auvergne-Rhône-Alpes",
    fees: 3550,
    ranking: "#99 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Science", "Computer Science", "Medicine"],
    website: "https://www.univ-grenoble-alpes.fr"
},
{
    id: 141,
    name: "Sciences Po",
    country: "France",
    location: "Paris",
    fees: 13000,
    ranking: "#221 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Economics", "Law", "Arts", "Business"],
    website: "https://www.sciencespo.fr"
},
{
    id: 142,
    name: "University of Lille",
    country: "France",
    location: "Lille, Hauts-de-France",
    fees: 3300,
    ranking: "#301 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Arts", "Engineering"],
    website: "https://www.univ-lille.fr"
},
{
    id: 143,
    name: "University of Rennes 1",
    country: "France",
    location: "Rennes, Brittany",
    fees: 3200,
    ranking: "#601 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Science", "Engineering", "Computer Science"],
    website: "https://www.univ-rennes1.fr"
},
{
    id: 144,
    name: "University of Nantes",
    country: "France",
    location: "Nantes, Pays de la Loire",
    fees: 3100,
    ranking: "#551 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Medicine", "Engineering", "Science", "Arts"],
    website: "https://www.univ-nantes.fr"
},
{
    id: 145,
    name: "INSA Lyon",
    country: "France",
    location: "Lyon, Auvergne-Rhône-Alpes",
    fees: 4200,
    ranking: "#701 Global",
    exams: ["TOEFL", "IELTS", "PTE", "Duolingo"],
    levels: ["Bachelor", "Master", "PhD"],
    fields: ["Engineering", "Computer Science", "Science", "Mathematics"],
    website: "https://www.insa-lyon.fr"
},

];

class UniversityBrowser {
    constructor() {
        this.universities = [...universitiesData];
        this.filteredUniversities = [...universitiesData];
        this.currentSort = 'name';
        this.filters = {
            countries: [],
            exams: [],
            levels: [],
            fields: [],
            minFees: 0,
            maxFees: 80000
        };
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupEventListeners();
        this.setupRangeSliders();
        this.renderUniversities();
        this.updateResultsCount();
    }

    setupNavigation() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const dropdowns = document.querySelectorAll('.dropdown');

        // Mobile toggle functionality
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Dropdown functionality for mobile
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header') && navMenu) {
                navMenu.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu) {
                navMenu.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    setupEventListeners() {
        // Sort dropdown
        const sortByElement = document.getElementById('sortBy');
        if (sortByElement) {
            sortByElement.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortAndRender();
            });
        }
        
        // Clear filters button
        const clearFiltersElement = document.getElementById('clearFilters');
        if (clearFiltersElement) {
            clearFiltersElement.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
        
        // Filter checkboxes
        this.setupFilterCheckboxes('countryFilters', 'countries');
        this.setupFilterCheckboxes('examFilters', 'exams');
        this.setupFilterCheckboxes('levelFilters', 'levels');
        this.setupFilterCheckboxes('fieldFilters', 'fields');
    }
    
    setupFilterCheckboxes(containerId, filterType) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFilter(filterType, checkbox.value, checkbox.checked);
            });
        });
    }
    
    setupRangeSliders() {
        const minFeesSlider = document.getElementById('minFees');
        const maxFeesSlider = document.getElementById('maxFees');
        const minFeesValue = document.getElementById('minFeesValue');
        const maxFeesValue = document.getElementById('maxFeesValue');
        
        if (!minFeesSlider || !maxFeesSlider || !minFeesValue || !maxFeesValue) {
            console.warn('Range slider elements not found');
            return;
        }
        
        // Create range fill element for visual feedback
        const rangeSliderContainer = minFeesSlider.parentElement;
        let rangeFill = rangeSliderContainer.querySelector('.range-fill');
        if (!rangeFill) {
            rangeFill = document.createElement('div');
            rangeFill.className = 'range-fill';
            rangeSliderContainer.appendChild(rangeFill);
        }
        
        const updateRangeValues = () => {
            let minVal = parseInt(minFeesSlider.value);
            let maxVal = parseInt(maxFeesSlider.value);
            
            // Ensure min doesn't exceed max
            if (minVal >= maxVal) {
                minVal = maxVal - 1000;
                minFeesSlider.value = minVal;
            }
            
            // Ensure max doesn't go below min
            if (maxVal <= minVal) {
                maxVal = minVal + 1000;
                maxFeesSlider.value = maxVal;
            }
            
            // Update display values
            minFeesValue.textContent = `$${minVal.toLocaleString()}`;
            maxFeesValue.textContent = `$${maxVal.toLocaleString()}`;
            
            // Update range fill visual
            const minPercent = (minVal / 80000) * 100;
            const maxPercent = (maxVal / 80000) * 100;
            
            rangeFill.style.left = `${minPercent}%`;
            rangeFill.style.width = `${maxPercent - minPercent}%`;
            
            // Update filters
            this.filters.minFees = minVal;
            this.filters.maxFees = maxVal;
            
            // Debounce the filter application
            clearTimeout(this.rangeTimeout);
            this.rangeTimeout = setTimeout(() => {
                this.applyFilters();
            }, 300);
        };
        
        // Initialize range values
        updateRangeValues();
        
        // Add event listeners with proper handling
        minFeesSlider.addEventListener('input', updateRangeValues);
        maxFeesSlider.addEventListener('input', updateRangeValues);
        
        // Handle mouse events for better UX
        [minFeesSlider, maxFeesSlider].forEach(slider => {
            slider.addEventListener('mousedown', () => {
                slider.classList.add('active');
            });
            
            slider.addEventListener('mouseup', () => {
                slider.classList.remove('active');
            });
            
            slider.addEventListener('mouseleave', () => {
                slider.classList.remove('active');
            });
        });
    }
    
    updateFilter(filterType, value, isChecked) {
        if (isChecked) {
            if (!this.filters[filterType].includes(value)) {
                this.filters[filterType].push(value);
            }
        } else {
            this.filters[filterType] = this.filters[filterType].filter(item => item !== value);
        }
        
        this.applyFilters();
    }
    
    applyFilters() {
        this.filteredUniversities = this.universities.filter(university => {
            // Country filter
            if (this.filters.countries.length > 0 && 
                !this.filters.countries.includes(university.country)) {
                return false;
            }
            
            // Exams filter (including PTE and Duolingo)
            if (this.filters.exams.length > 0 && 
                !this.filters.exams.some(exam => university.exams.includes(exam))) {
                return false;
            }
            
            // Levels filter
            if (this.filters.levels.length > 0 && 
                !this.filters.levels.some(level => university.levels.includes(level))) {
                return false;
            }
            
            // Fields filter
            if (this.filters.fields.length > 0 && 
                !this.filters.fields.some(field => university.fields.includes(field))) {
                return false;
            }
            
            // Fees filter
            if (university.fees < this.filters.minFees || university.fees > this.filters.maxFees) {
                return false;
            }
            
            return true;
        });
        
        this.sortAndRender();
    }
    
    sortUniversities() {
        this.filteredUniversities.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'nameDesc':
                    return b.name.localeCompare(a.name);
                case 'fees':
                    return a.fees - b.fees;
                case 'feesDesc':
                    return b.fees - a.fees;
                case 'ranking':
                    const rankA = parseInt(a.ranking.replace(/[^\d]/g, ''));
                    const rankB = parseInt(b.ranking.replace(/[^\d]/g, ''));
                    return rankA - rankB;
                case 'country':
                    return a.country.localeCompare(b.country);
                default:
                    return 0;
            }
        });
    }
    
    sortAndRender() {
        this.sortUniversities();
        this.renderUniversities();
        this.updateResultsCount();
    }
    
    renderUniversities() {
        const container = document.getElementById('universitiesList');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const noResults = document.getElementById('noResults');
        
        if (!container) return;
        
        // Show loading
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'none';
        
        // Simulate loading delay
        setTimeout(() => {
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            
            if (this.filteredUniversities.length === 0) {
                if (noResults) noResults.style.display = 'block';
                return;
            }
            
            const universitiesHTML = this.filteredUniversities.map(university => 
                this.createUniversityCard(university)
            ).join('');
            
            container.innerHTML = universitiesHTML;
            
            // Add animation to cards
            const cards = container.querySelectorAll('.university-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);
    }
    
    createUniversityCard(university) {
        const examTags = university.exams.map(exam => 
            `<span class="tag exam">${exam}</span>`
        ).join('');
        
        const levelTags = university.levels.map(level => 
            `<span class="tag level">${level}</span>`
        ).join('');
        
        const fieldTags = university.fields.map(field => 
            `<span class="tag field">${field}</span>`
        ).join('');
        
        return `
            <div class="university-card" data-id="${university.id}">
                <div class="university-header">
                    <h3 class="university-name">${university.name}</h3>
                    <div class="university-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${university.location}
                    </div>
                </div>
                
                <div class="university-body">
                    <div class="university-info">
                        <div class="info-row">
                            <span class="info-label">
                                <i class="fas fa-trophy"></i>
                                Ranking
                            </span>
                            <span class="info-value ranking">${university.ranking}</span>
                        </div>
                        
                        <div class="info-row">
                            <span class="info-label">
                                <i class="fas fa-dollar-sign"></i>
                                Annual Fees
                            </span>
                            <span class="info-value fees">${university.fees.toLocaleString()}</span>
                        </div>
                        
                        <div class="info-row">
                            <span class="info-label">
                                <i class="fas fa-flag"></i>
                                Country
                            </span>
                            <span class="info-value">${university.country}</span>
                        </div>
                    </div>
                    
                    <div class="university-tags">
                        ${examTags}
                        ${levelTags}
                        ${fieldTags}
                    </div>
                </div>
                
                <div class="university-footer">
                    <a href="${university.website}" target="_blank" class="visit-website">
                        <i class="fas fa-external-link-alt"></i>
                        Visit Website
                    </a>
                </div>
            </div>
        `;
    }
    
    updateResultsCount() {
        const countElement = document.getElementById('resultsCount');
        if (!countElement) return;
        
        const count = this.filteredUniversities.length;
        countElement.textContent = `Showing ${count} ${count === 1 ? 'university' : 'universities'}`;
    }
    
    clearAllFilters() {
        // Reset filter object
        this.filters = {
            countries: [],
            exams: [],
            levels: [],
            fields: [],
            minFees: 0,
            maxFees: 80000
        };
        
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset range sliders
        const minFeesSlider = document.getElementById('minFees');
        const maxFeesSlider = document.getElementById('maxFees');
        const minFeesValue = document.getElementById('minFeesValue');
        const maxFeesValue = document.getElementById('maxFeesValue');
        
        if (minFeesSlider) minFeesSlider.value = 0;
        if (maxFeesSlider) maxFeesSlider.value = 80000;
        if (minFeesValue) minFeesValue.textContent = '$0';
        if (maxFeesValue) maxFeesValue.textContent = '$80,000';
        
        // Reset range fill
        const rangeFill = document.querySelector('.range-fill');
        if (rangeFill) {
            rangeFill.style.left = '0%';
            rangeFill.style.width = '100%';
        }
        
        // Reset sort
        const sortByElement = document.getElementById('sortBy');
        if (sortByElement) {
            sortByElement.value = 'name';
            this.currentSort = 'name';
        }
        
        // Apply filters (which will show all universities)
        this.applyFilters();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UniversityBrowser();
});

// Add some utility functions for enhanced functionality
function getCountryFlag(country) {
    const flags = {
        'USA': '🇺🇸',
        'UK': '🇬🇧',
        'Canada': '🇨🇦',
        'Australia': '🇦🇺',
        'Germany': '🇩🇪',
        'France': '🇫🇷',
        'Netherlands': '🇳🇱',
        'Switzerland': '🇨🇭',
        'China': '🇨🇳'
    };
    return flags[country] || '🌍';
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
            <i class="fas fa-exclamation-triangle"></i>
            Something went wrong. Please refresh the page and try again.
        </div>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(errorDiv, container.firstChild);
    }
});

// Performance optimization for large datasets
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll functionality for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#') && href !== '#') {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
});