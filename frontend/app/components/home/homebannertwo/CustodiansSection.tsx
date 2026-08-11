"use client";

import React from "react";

export function CustodiansSection() {
  return (
    <section className="py-40 bg-surface-container-highest/30">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-24 reveal-up">
          <h2 className="font-display-lg text-headline-lg text-primary">The Custodians of Wisdom</h2>
          <p className="text-body-lg text-secondary mt-4 max-w-2xl mx-auto">
            Meet the world-renowned practitioners dedicated to your holistic well-being.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Doctor 1 */}
          <div className="reveal-up">
            <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Dr. Vikram Varma portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVFfDEjsIentiG1FCz6G5Aqh9aGswZK2lht4TNC7O6LSWllsk6L2-FGUsvtXwigJCleI3vRUhaY785YVuLjNawv7BCelN2zETixLJixvym7S4LljfcxaDLdGK2tbu66inEo-rvIOyEkGGRkiGBS6whEi6_qbaVYAtVCiXd0N9tk8v1Do4swzxfHVKytZkuuDYKMk6B9Yidj5y3f2BwBoZjCf_BEcNbXlks-1yr2PN9N0QnVA1ga-WpnQFgSFTH6UhBW2n0q5LQk-ho"
              />
            </div>
            <h4 className="font-display-lg text-headline-md text-primary">Dr. Vikram Varma</h4>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
              CHIEF MEDICAL OFFICER
            </span>
          </div>

          {/* Doctor 2 */}
          <div className="reveal-up delay-100">
            <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Dr. Maya Nair portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2ZYtLGoY5M5BPbJjI6pkZD_tnoS95tHHaKrag_Z8QHjY8L6PvaG22WgADQj4NZ5Q-ZNVMUn64cMhxLzUROEbBnJrsEgNvAhqzk0niUZPHTfdIO3bu6CKQKkdL4NfK9R2SS9g0_T7OS0FeHjD8isC2ZZqn6Xf4vmbIg2XOvPHwjU-55zuXSulprFveQr2oZR0uZ4guqiX_zI5r3csxIeXuIwzfy2NZXLdjA0wTB-auRDLyMoZOxrHU3tYT1q99sUsCcb7XcrFA2dDp"
              />
            </div>
            <h4 className="font-display-lg text-headline-md text-primary">Dr. Maya Nair</h4>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
              RITUAL DESIGNER
            </span>
          </div>

          {/* Doctor 3 */}
          <div className="reveal-up delay-200">
            <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Dr. Aryan Gupta portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwElIm23mDa8_PISbaNeVOwqEWeNRUi0-MNjQZKJm3gwY2blzbtUF-0Qvw4kwbS6GqkD-JXNaE1wrMeBnRHba8LViMbIAO7jc8a810QSKGMTiEb0_9vE5ePpPjmPWySFoG_ca2vHRrgV5VfCu2VW1_se07mAb4Cd65rK_2BTA6ulgO2pFEmBhzm4gwMuSS0MCS8tcs9PBKO7OzII395iwYJtzxFgTwhLkBbulkg1lPCfQ0xOtrG1atOxHU622komcGm_uj8C24wSEA"
              />
            </div>
            <h4 className="font-display-lg text-headline-md text-primary">Dr. Aryan Gupta</h4>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
              HERBAL SCIENCE LEAD
            </span>
          </div>

          {/* Doctor 4 */}
          <div className="reveal-up delay-300">
            <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Dr. Lakshmi Rao portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX_Wyq1lVJxYt0Y5OJ7C5Olb0GwMSGIW-yTzCuBPA-wZKpdne49wyyM3S3iAhb7oVKkZkVJIi65vT0Ikv8-yv0VzxQdMfwsTyp1tl_EC_P-MTefJyx3N872KmmITrqiJwN-bVdhAn6UcLQcn38Kv2TTAd_4_saRBQIfyjvC07HzbRzxtvldTaOpG9NbJnVkU_6mh--9S7O5g4lcQYsEIlVfP5aSkXQyIchheyJznOSUATl2lduYtR4i8ARe8JCMqC-v3pHAfC0f7rE"
              />
            </div>
            <h4 className="font-display-lg text-headline-md text-primary">Dr. Lakshmi Rao</h4>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
              WELLNESS CONSULTANT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
