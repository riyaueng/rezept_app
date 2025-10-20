export default function Footer() {
  return (
    <footer className="bg-blue-midtone h-20 py-3.5 px-7 flex gap-18 items-center justify-between">
      <div>
        <img src="/public/img/rezeptwelt_logo.svg" alt="Rezetwelt Logo" className="h-10" />
      </div>

      <div>
        <div className="flex gap-6">
          <p className="text-grey-fonts dark:text-blue-white hover:text-blue-secondary">Impressum</p>
          <img src="/public/img/icon_instagram.svg" alt="Instagram Icon" className="w-7" />
          <img src="/public/img/icon_facebook.svg" alt="Facebook Icon" className="w-7" />
        </div>
      </div>
    </footer>
  )
}
