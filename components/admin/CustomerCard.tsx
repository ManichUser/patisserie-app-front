
import { Customer } from "@/lib/types";
import { Users, Mail, Phone, Star, Calendar, MessageCircle, Eye } from "lucide-react";
export default function CustomerCard({ customer}:{customer: Customer}) {
    const getSegmentBadge = (segment: string) => {
        const configs = {
          NEW: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
          REGULAR: { label: 'Régulier', color: 'bg-green-100 text-green-700' },
          VIP: { label: 'VIP', color: 'bg-blue-100 text-blue-700' },
          INACTIVE: { label: 'Inactif', color: 'bg-gray-100 text-gray-700' },
          PROSPECT: { label: 'Prospect', color: 'bg-purple-100 text-purple-700' },
        }
        const config = configs[segment as keyof typeof configs] || configs.PROSPECT
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
            {config.label}
          </span>
        )
      }
      const sendWhatsApp = (customer: Customer) => {
        const message = `Bonjour ${customer.name}, merci pour votre fidélité ! 🎉`
        const url = `https://wa.me/${customer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
      }
      


  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Jamais'
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }


    

return (
    <div
    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
    {/* Header */}
    <div className="p-4 bg-linear-to-r from-blue-50 to-orange-50">
    <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Users className="w-6 h-6 text-blue-700" />
        </div>
        <div>
            <p className="font-bold text-gray-900">{customer.name}</p>
            {getSegmentBadge(customer.segment)}
        </div>
        </div>
    </div>
    </div>

    {/* Content */}
    <div className="p-4 space-y-3">
    {/* Contact */}
    <div className="flex items-center gap-2 text-sm">
        <Mail className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700 truncate">{customer.email}</span>
    </div>

    <div className="flex items-center gap-2 text-sm">
        <Phone className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700">{customer.phone}</span>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-3 pt-3 border-t">
        <div className="text-center bg-gray-50 rounded-lg p-2">
        <p className="text-lg font-bold text-gray-900">
            {customer.totalOrders}
        </p>
        <p className="text-xs text-gray-600">Commandes</p>
        </div>

        <div className="text-center bg-blue-50 rounded-lg p-2">
        <p className="text-lg font-bold text-blue-700">
            {(customer.totalSpent / 1000).toFixed(0)}k
        </p>
        <p className="text-xs text-blue-600">Total FCFA</p>
        </div>
    </div>

    {/* Loyalty Points */}
    <div className="flex items-center justify-between text-sm bg-purple-50 p-2 rounded-lg">
        <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-purple-600" />
        <span className="text-purple-700 font-semibold">
            {customer.loyaltyPoints} points
        </span>
        </div>
    </div>

    {/* Last Order */}
    <div className="flex items-center gap-2 text-xs text-gray-600">
        <Calendar className="w-3 h-3" />
        <span>
        Dernière commande: {formatDate(customer.lastOrderDate)}
        </span>
    </div>

    {/* Actions */}
    <div className="flex gap-2 pt-3 border-t">
        <button
        onClick={() => sendWhatsApp(customer)}
        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
        </button>
        <button className="flex items-center justify-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        <Eye className="w-4 h-4" />
        </button>
    </div>
    </div>
    </div>
    );
    }



