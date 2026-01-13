'use client';

import { useState } from 'react';
import { GroupCard } from './GroupCard';
import { Search, Users } from 'lucide-react';

interface GroupsListProps {
  groups: any[];
  onViewDetails: (jid: string) => void;
  onSendMessage: (jid: string) => void;
}

export function GroupsList({ groups, onViewDetails, onSendMessage }: GroupsListProps) {
  const [search, setSearch] = useState('');

  const filtered = groups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase()) ||
    group.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un groupe..."
          className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Results Count */}
      {search && (
        <p className="text-sm text-gray-600">
          {filtered.length} résultat(s) sur {groups.length}
        </p>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900">
            {search ? 'Aucun groupe trouvé' : 'Aucun groupe disponible'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {search ? 'Essayez avec un autre terme' : 'Synchronisez vos groupes WhatsApp'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((group) => (
            <GroupCard
              key={group.jid}
              group={group}
              onViewDetails={onViewDetails}
              onSendMessage={onSendMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
}