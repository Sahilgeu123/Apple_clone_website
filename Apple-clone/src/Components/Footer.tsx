
import { footerLinks } from '../constants'
import '../index.css'
const Footer = () => {
  return (
    <footer>
      <div className='container mx-auto pt-15 pb-7 max-lg:px-5  '>
        <div className='flex justify-between'>
          <p>More ways to shop: Find an Apple Store or other retailer near you. Or call 000800 040 1966</p>
          <img src="/logo.svg" alt="appleLogo" />
        </div>
        <hr className='my-7 border-[#424245]' />
        <div className='flex flex-col lg:flex-row lg:items-center justify-between max-lg:mt-5 gap-5 text-sm'>
          <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
          <ul className='lg:divide-x flex flex-col lg:flex-row gap-2.5'>
            {footerLinks.map(({ label, link }) => (
              <li key={label} className='lg:px-5 cursor-pointer hover:text-primary transition-all duration-300 ease-in-out' >
                <a href={link}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer