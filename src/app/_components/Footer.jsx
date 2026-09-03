import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-full bg-[#4338CA] text-white text-[14px]">
      <div className="py-10 px-20 flex justify-between">
        <div className="flex flex-col gap-3">
          <img src="/Logo2.png" className="w-23 h-5" />
          <p className="font-normal text-indigo-200">
            © 2026 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-22">
          <div className="flex flex-col">
            <p className="font-semibold text-white mb-3">Contact Information</p>

            <div className="flex flex-col gap-6">
              <div className="flex gap-3">
                <Mail className="h-4 w-4 text-indigo-200 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-indigo-200 text-xs">Email:</p>
                  <p className="font-normal text-white">support@movieZ.com</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="h-4 w-4 text-indigo-200 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-indigo-200 text-xs">Phone:</p>
                  <p className="font-normal text-white">+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-white">Follow us</p>
            <div className="flex gap-3 font-medium text-indigo-100">
              <p className="cursor-pointer hover:text-white transition-colors">
                Facebook
              </p>
              <p className="cursor-pointer hover:text-white transition-colors">
                Instagram
              </p>
              <p className="cursor-pointer hover:text-white transition-colors">
                Twitter
              </p>
              <p className="cursor-pointer hover:text-white transition-colors">
                Youtube
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
