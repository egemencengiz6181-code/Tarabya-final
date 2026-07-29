"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormPage() {
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);
 const [formData, setFormData] = useState({
 studentName: "",
 parentName: "",
 phone: "",
 email: "",
 grade: "",
 currentSchool: "",
 district: "",
 program: "",
 note: "",
 });

 const gradeOptions = [
 "6. Sınıf",
 "7. Sınıf",
 "8. Sınıf",
 "9. Sınıf",
 "10. Sınıf",
 "11. Sınıf",
 "12. Sınıf",
 "Mezun",
 ];

 const programOptions = [
 "Ortaokul Programı (LGS Hazırlık)",
 "Lise Programı (YKS Hazırlık)",
 "VIP Programlar",
 "Deneme Kulübü",
 "Özel Ders",
 "Henüz Karar Vermedim",
 ];

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 setLoading(true);

 // Prepare data for /api/contact
 const payload = {
 type: "landing",
 name: `${formData.studentName} (Veli: ${formData.parentName})`,
 email: formData.email || "form@landing.com",
 phone: formData.phone,
 message: `Öğrenci: ${formData.studentName}\nVeli: ${formData.parentName}\nTelefon: ${formData.phone}\nE-posta: ${formData.email || "—"}\nÖnümüzdeki Yıl Sınıfı: ${formData.grade}\nMevcut Okul: ${formData.currentSchool}\nİlçe: ${formData.district}\nİlgilendiği Program: ${formData.program}\n\nEk Not:\n${formData.note || "—"}`,
 };

 try {
 const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
 });

 if (res.ok) {
  setSuccess(true);
  setTimeout(() => {
  router.push("/tr");
  }, 3000);
 } else {
  alert("Bir hata oluştu. Lütfen tekrar deneyin.");
 }
 } catch (err) {
 console.error(err);
 alert("Bir hata oluştu. Lütfen tekrar deneyin.");
 } finally {
 setLoading(false);
 }
 };

 if (success) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted px-6">
  <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="text-center"
  >
  <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
  className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
  >
  <CheckCircle2 className="w-12 h-12 text-green-500" />
  </motion.div>
  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
  Başvurunuz Alındı!
  </h2>
  <p className="text-slate-500 dark:text-white/50 mb-4">
  En kısa sürede sizinle iletişime geçeceğiz.
  </p>
  <p className="text-sm text-slate-400 dark:text-white/30">
  Ana sayfaya yönlendiriliyorsunuz...
  </p>
  </motion.div>
 </div>
 );
 }

 return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-muted px-6 py-12">
 {/* Title */}
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-center mb-8 max-w-2xl mt-20"
 >
  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
  Kayıt Başvuru Formu
  </h1>
  <p className="text-lg text-slate-500 dark:text-white/50">
  Lütfen aşağıdaki formu eksiksiz doldurun. En kısa sürede sizinle iletişime geçeceğiz.
  </p>
 </motion.div>

 {/* Form Container */}
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="w-full max-w-2xl bg-background/95 border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-xl"
 >
  <form onSubmit={handleSubmit} className="space-y-5">
  {/* Öğrenci Adı Soyadı */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   Öğrenci Adı Soyadı <span className="text-red-500">*</span>
  </label>
  <input
   type="text"
   name="studentName"
   value={formData.studentName}
   onChange={handleChange}
   required
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all"
   placeholder="Öğrenci adı ve soyadı"
  />
  </div>

  {/* Veli Adı Soyadı */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   Veli Adı Soyadı <span className="text-red-500">*</span>
  </label>
  <input
   type="text"
   name="parentName"
   value={formData.parentName}
   onChange={handleChange}
   required
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all"
   placeholder="Veli adı ve soyadı"
  />
  </div>

  {/* Telefon */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   Telefon Numarası <span className="text-red-500">*</span>
  </label>
  <input
   type="tel"
   name="phone"
   value={formData.phone}
   onChange={handleChange}
   required
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all"
   placeholder="05XX XXX XX XX"
  />
  </div>

  {/* E-posta (opsiyonel) */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   E-posta
  </label>
  <input
   type="email"
   name="email"
   value={formData.email}
   onChange={handleChange}
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all"
   placeholder="ornek@email.com"
  />
  </div>

  {/* Önümüzdeki Yıl Sınıfı */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   Önümüzdeki Yıl Sınıfı <span className="text-red-500">*</span>
  </label>
  <select
   name="grade"
   value={formData.grade}
   onChange={handleChange}
   required
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all"
  >
   <option value="">Seçiniz...</option>
   {gradeOptions.map((g) => (
   <option key={g} value={g}>
   {g}
   </option>
   ))}
  </select>
  </div>

  {/* Mevcut Okulu */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   Mevcut Okulu <span className="text-red-500">*</span>
  </label>
  <input
   type="text"
   name="currentSchool"
   value={formData.currentSchool}
   onChange={handleChange}
   required
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all"
   placeholder="Okul adı"
  />
  </div>

  {/* İlçe */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   Bulunduğunuz İlçe <span className="text-red-500">*</span>
  </label>
  <input
   type="text"
   name="district"
   value={formData.district}
   onChange={handleChange}
   required
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all"
   placeholder="Örn: Sarıyer, Beşiktaş, Şişli"
  />
  </div>

  {/* Program */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   İlgilendiğiniz Program <span className="text-red-500">*</span>
  </label>
  <select
   name="program"
   value={formData.program}
   onChange={handleChange}
   required
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all"
  >
   <option value="">Seçiniz...</option>
   {programOptions.map((p) => (
   <option key={p} value={p}>
   {p}
   </option>
   ))}
  </select>
  </div>

  {/* Ek Not */}
  <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-[#E21F26] mb-2">
   Ek Not / Sorularınız
  </label>
  <textarea
   name="note"
   value={formData.note}
   onChange={handleChange}
   rows={4}
   className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all resize-none"
   placeholder="Varsa ek not veya sorularınız..."
  />
  </div>

  {/* Submit Button */}
  <button
  type="submit"
  disabled={loading}
  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#E21F26] hover:bg-[#BE1821] disabled:bg-[#E21F26]/50 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(226,31,38,0.35)] hover:shadow-[0_0_32px_rgba(226,31,38,0.5)] disabled:cursor-not-allowed disabled:hover:scale-100"
  >
  {loading ? (
   <>
   <Loader2 className="w-5 h-5 animate-spin" />
   Gönderiliyor...
   </>
  ) : (
   <>
   <Send className="w-5 h-5" />
   Başvuruyu Gönder
   </>
  )}
  </button>
  </form>
 </motion.div>

 {/* Footer note */}
 <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  className="text-center text-xs text-slate-400 dark:text-white/30 mt-6 max-w-md"
 >
  Başvurunuz alındıktan sonra en kısa sürede sizinle iletişime geçeceğiz.
 </motion.p>
 </div>
 );
}
