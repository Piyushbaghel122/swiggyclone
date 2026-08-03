import Link from "next/link";

export default function CitiesPage() {
      const list = [
  { id: 1, name: "Delhi", state: "Delhi", slug: "delhi" },
  { id: 2, name: "Mumbai", state: "Maharashtra", slug: "mumbai" },
  { id: 3, name: "Bengaluru", state: "Karnataka", slug: "bengaluru" },
  { id: 4, name: "Hyderabad", state: "Telangana", slug: "hyderabad" },
  { id: 5, name: "Chennai", state: "Tamil Nadu", slug: "chennai" },
  { id: 6, name: "Kolkata", state: "West Bengal", slug: "kolkata" },
  { id: 7, name: "Pune", state: "Maharashtra", slug: "pune" },
  { id: 8, name: "Ahmedabad", state: "Gujarat", slug: "ahmedabad" },
  { id: 9, name: "Jaipur", state: "Rajasthan", slug: "jaipur" },
  { id: 10, name: "Surat", state: "Gujarat", slug: "surat" },
  { id: 11, name: "Lucknow", state: "Uttar Pradesh", slug: "lucknow" },
  { id: 12, name: "Kanpur", state: "Uttar Pradesh", slug: "kanpur" },
  { id: 13, name: "Nagpur", state: "Maharashtra", slug: "nagpur" },
  { id: 14, name: "Indore", state: "Madhya Pradesh", slug: "indore" },
  { id: 15, name: "Bhopal", state: "Madhya Pradesh", slug: "bhopal" },
  { id: 16, name: "Patna", state: "Bihar", slug: "patna" },
  { id: 17, name: "Visakhapatnam", state: "Andhra Pradesh", slug: "visakhapatnam" },
  { id: 18, name: "Vadodara", state: "Gujarat", slug: "vadodara" },
  { id: 19, name: "Ludhiana", state: "Punjab", slug: "ludhiana" },
  { id: 20, name: "Agra", state: "Uttar Pradesh", slug: "agra" },
  { id: 21, name: "Nashik", state: "Maharashtra", slug: "nashik" },
  { id: 22, name: "Faridabad", state: "Haryana", slug: "faridabad" },
  { id: 23, name: "Meerut", state: "Uttar Pradesh", slug: "meerut" },
  { id: 24, name: "Rajkot", state: "Gujarat", slug: "rajkot" },
  { id: 25, name: "Varanasi", state: "Uttar Pradesh", slug: "varanasi" },
  { id: 26, name: "Prayagraj", state: "Uttar Pradesh", slug: "prayagraj" },
  { id: 27, name: "Amritsar", state: "Punjab", slug: "amritsar" },
  { id: 28, name: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { id: 29, name: "Coimbatore", state: "Tamil Nadu", slug: "coimbatore" },
  { id: 30, name: "Mysuru", state: "Karnataka", slug: "mysuru" },
  { id: 31, name: "Kochi", state: "Kerala", slug: "kochi" },
  { id: 32, name: "Thiruvananthapuram", state: "Kerala", slug: "thiruvananthapuram" },
  { id: 33, name: "Bhubaneswar", state: "Odisha", slug: "bhubaneswar" },
  { id: 34, name: "Guwahati", state: "Assam", slug: "guwahati" },
  { id: 35, name: "Chandigarh", state: "Chandigarh", slug: "chandigarh" },
  { id: 36, name: "Noida", state: "Uttar Pradesh", slug: "noida" },
  { id: 37, name: "Gurugram", state: "Haryana", slug: "gurugram" },
  { id: 38, name: "Jodhpur", state: "Rajasthan", slug: "jodhpur" },
  { id: 39, name: "Udaipur", state: "Rajasthan", slug: "udaipur" },
  { id: 40, name: "Dehradun", state: "Uttarakhand", slug: "dehradun" },
  { id: 41, name: "Bhubaneswar", state: "Odisha", slug: "bhubaneswar" },
  { id: 42, name: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { id: 43, name: "Chandigarh", state: "Chandigarh", slug: "chandigarh" },
  { id: 44, name: "Patna", state: "Bihar", slug: "patna" },
  { id: 45, name: "Ludhiana", state: "Punjab", slug: "ludhiana" },
  { id: 46, name: "Amritsar", state: "Punjab", slug: "amritsar" },
  { id: 47, name: "Agra", state: "Uttar Pradesh", slug: "agra" },
  { id: 48, name: "Dehradun", state: "Uttarakhand", slug: "dehradun" },
  { id: 49, name: "Meerut", state: "Uttar Pradesh", slug: "meerut" },
  { id: 50, name: "Varanasi", state: "Uttar Pradesh", slug: "varanasi" },
  { id: 51, name: "Prayagraj", state: "Uttar Pradesh", slug: "prayagraj" },
  { id: 52, name: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { id: 53, name: "Coimbatore", state: "Tamil Nadu", slug: "coimbatore" },
  { id: 54, name: "Mysuru", state: "Karnataka", slug: "mysuru" },
  { id: 55, name: "Kochi", state: "Kerala", slug: "kochi" },
  { id: 56, name: "Thiruvananthapuram", state: "Kerala", slug: "thiruvananthapuram" },
  { id: 57, name: "Bhubaneswar", state: "Odisha", slug: "bhubaneswar" },
  { id: 58, name: "Guwahati", state: "Assam", slug: "guwahati" },
  { id: 59, name: "Chandigarh", state: "Chandigarh", slug: "chandigarh" },
  { id: 60, name: "Noida", state: "Uttar Pradesh", slug: "noida" },
  { id: 61, name: "Gurugram", state: "Haryana", slug: "gurugram" },
  { id: 62, name: "Jodhpur", state: "Rajasthan", slug: "jodhpur" },
  { id: 63, name: "Udaipur", state: "Rajasthan", slug: "udaipur" },
  { id: 64, name: "Dehradun", state: "Uttarakhand", slug: "dehradun" },
  { id: 65, name: "Bhubaneswar", state: "Odisha", slug: "bhubaneswar" },
  { id: 66, name: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { id: 67, name: "Chandigarh", state: "Chandigarh", slug: "chandigarh" },
  { id: 68, name: "Patna", state: "Bihar", slug: "patna" },
  { id: 69, name: "Ludhiana", state: "Punjab", slug: "ludhiana" },
  { id: 70, name: "Amritsar", state: "Punjab", slug: "amritsar" },
  { id: 71, name: "Agra", state: "Uttar Pradesh", slug: "agra" },
  { id: 72, name: "Dehradun", state: "Uttarakhand", slug: "dehradun" },
  { id: 73, name: "Meerut", state: "Uttar Pradesh", slug: "meerut" },
  { id: 74, name: "Varanasi", state: "Uttar Pradesh", slug: "varanasi" },
  { id: 75, name: "Prayagraj", state: "Uttar Pradesh", slug: "prayagraj" },
  { id: 76, name: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { id: 77, name: "Coimbatore", state: "Tamil Nadu", slug: "coimbatore" },
  { id: 78, name: "Mysuru", state: "Karnataka", slug: "mysuru" },
  { id: 79, name: "Kochi", state: "Kerala", slug: "kochi" },
  { id: 80, name: "Thiruvananthapuram", state: "Kerala", slug: "thiruvananthapuram" },
  { id: 81, name: "Bhubaneswar", state: "Odisha", slug: "bhubaneswar" },
  { id: 82, name: "Guwahati", state: "Assam", slug: "guwahati" },
  { id: 83, name: "Chandigarh", state: "Chandigarh", slug: "chandigarh" },
  { id: 84, name: "Noida", state: "Uttar Pradesh", slug: "noida" },
  { id: 85, name: "Gurugram", state: "Haryana", slug: "gurugram" },
  { id: 86, name: "Jodhpur", state: "Rajasthan", slug: "jodhpur" },
  { id: 87, name: "Udaipur", state: "Rajasthan", slug: "udaipur" },
  { id: 88, name: "Dehradun", state: "Uttarakhand", slug: "dehradun" },
  { id: 89, name: "Bhubaneswar", state: "Odisha", slug: "bhubaneswar" },
  { id: 90, name: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { id: 91, name: "Chandigarh", state: "Chandigarh", slug: "chandigarh" },
  { id: 92, name: "Patna", state: "Bihar", slug: "patna" },
  { id: 93, name: "Ludhiana", state: "Punjab", slug: "ludhiana" },
  { id: 94, name: "Amritsar", state: "Punjab", slug: "amritsar" },
  { id: 95, name: "Agra", state: "Uttar Pradesh", slug: "agra" },
  { id: 96, name: "Dehradun", state: "Uttarakhand", slug: "dehradun" },
  { id: 97, name: "Meerut", state: "Uttar Pradesh", slug: "meerut" },
  { id: 98, name: "Varanasi", state: "Uttar Pradesh", slug: "varanasi" },
  { id: 99, name: "Prayagraj", state: "Uttar Pradesh", slug: "prayagraj" },
  { id: 100, name: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { id: 101, name: "Coimbatore", state: "Tamil Nadu", slug: "coimbatore" },
  { id: 102, name: "Mysuru", state: "Karnataka", slug: "mysuru" },
  { id: 103, name: "Kochi", state: "Kerala", slug: "kochi" },
  { id: 104, name: "Thiruvananthapuram", state: "Kerala", slug: "thiruvananthapuram"},
  { id: 105, name: "Mysuru", state: "Karnataka", slug: "mysuru" }
  ]
    return (
        <>
        <section>
      <div className="grid p-20 grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((city) => (
          <Link
            key={city.id}
            href={`/cities/${city.slug}`}
            className="border rounded-lg p-4 hover:bg-orange-500 hover:text-white transition"
          >
            <h2 className="text-lg font-semibold">{city.name}</h2>
            <p className="text-sm">{city.state}</p>
          </Link>
        ))}
      </div>
    </section>
  </>
  );
}