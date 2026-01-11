// src/app/profile/help/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageCircle, Mail, Phone, ChevronRight, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button3';

interface FAQ {
  question: string;
  answer: string;
}

export default function HelpSupportPage() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'Comment passer une commande ?',
      answer: 'Pour passer une commande, parcourez notre catalogue, ajoutez des articles à votre panier, puis procédez au paiement. Vous recevrez une confirmation par email.',
    },
    {
      question: 'Quels sont les modes de paiement acceptés ?',
      answer: 'Nous acceptons les cartes Visa, Mastercard, ainsi que les paiements mobiles (MTN Mobile Money, Orange Money).',
    },
    {
      question: 'Combien de temps prend la livraison ?',
      answer: 'La livraison standard prend 1-2 jours ouvrables. Pour les commandes urgentes, nous proposons une livraison express le jour même.',
    },
    {
      question: 'Puis-je annuler ma commande ?',
      answer: 'Vous pouvez annuler votre commande dans les 2 heures suivant la confirmation. Au-delà, contactez notre service client.',
    },
    {
      question: 'Comment suivre ma commande ?',
      answer: 'Accédez à "Order History" dans votre profil pour suivre le statut de vos commandes en temps réel.',
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'Live Chat',
      description: 'Chat with our support team',
      action: () => console.log('Open chat'),
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Mail,
      label: 'Email',
      description: 'support@sweetdelices.com',
      action: () => window.location.href = 'mailto:support@sweetdelices.com',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: Phone,
      label: 'Phone',
      description: '+237 699 999 999',
      action: () => window.location.href = 'tel:+237699999999',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Contact Methods */}
        <div className="space-y-3">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <button
                key={index}
                onClick={method.action}
                className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${method.iconColor}`} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">{method.label}</h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFAQ === index && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Ticket */}
        <div className="bg-linear-to-br from-amber-600 to-amber-700 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-xl mb-2">Still need help?</h3>
          <p className="text-amber-100 mb-4">
            Submit a support ticket and we'll get back to you within 24 hours.
          </p>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => router.push('/profile/help/submit-ticket')}
            className="bg-white text-amber-700 border-0 hover:bg-amber-50"
          >
            Submit a Ticket
          </Button>
        </div>
      </div>
    </main>
  );
}