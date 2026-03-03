// // src/lib/api.ts
//
// // ✅ Static data - cache forever, revalidate once a day
// export async function getPrograms() {
//   const res = await fetch("https://api.hdm.edu.gh/programs", {
//     next: { revalidate: 86400 }, // 👈 revalidate every 24 hours
//   });
//   return res.json();
// }
//
// // ✅ News - revalidate every hour
// export async function getNews() {
//   const res = await fetch("https://api.hdm.edu.gh/news", {
//     next: { revalidate: 3600 }, // 👈 revalidate every 1 hour
//   });
//   return res.json();
// }
//
// // ✅ Admissions - revalidate every week
// export async function getAdmissions() {
//   const res = await fetch("https://api.hdm.edu.gh/admissions", {
//     next: { revalidate: 604800 }, // 👈 revalidate every 7 days
//   });
//   return res.json();
// }
//
// // ✅ Dynamic data - no cache (always fresh)
// export async function getAnnouncements() {
//   const res = await fetch("https://api.hdm.edu.gh/announcements", {
//     cache: "no-store", // 👈 always fetch fresh
//   });
//   return res.json();
// }