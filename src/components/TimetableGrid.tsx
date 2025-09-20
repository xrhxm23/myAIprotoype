import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { TimetableEntry, TimeSlot, Subject, Teacher } from '../types';
import { Clock, User, BookOpen } from 'lucide-react';

interface TimetableGridProps {
  entries: TimetableEntry[];
  timeSlots: TimeSlot[];
  subjects: Subject[];
  teachers: Teacher[];
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const subjectColors: Record<string, string> = {
  'core': 'bg-blue-100 text-blue-800',
  'elective': 'bg-purple-100 text-purple-800',
  'vocational': 'bg-orange-100 text-orange-800',
  'art_education': 'bg-pink-100 text-pink-800',
  'physical_education': 'bg-green-100 text-green-800',
  'value_education': 'bg-yellow-100 text-yellow-800',
};

export default function TimetableGrid({ entries, timeSlots, subjects, teachers }: TimetableGridProps) {
  const getEntryForSlot = (dayIndex: number, slotId: string) => {
    return entries.find(entry => 
      entry.day_of_week === dayIndex + 1 && entry.time_slot_id === slotId
    );
  };

  const getSubject = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId);
  };

  const getTeacher = (teacherId: string) => {
    return teachers.find(t => t.id === teacherId);
  };

  const getTimeSlot = (slotId: string) => {
    return timeSlots.find(t => t.id === slotId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Weekly Timetable</h2>
        <p className="mt-2 text-gray-600">NEP 2020 Compliant Schedule</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <div>
                      <div>{slot.start_time} - {slot.end_time}</div>
                      <div className="text-xs text-gray-500">{slot.duration_minutes} min</div>
                    </div>
                  </div>
                </td>
                {days.map((day, dayIndex) => {
                  const entry = getEntryForSlot(dayIndex, slot.id);
                  const subject = entry ? getSubject(entry.subject_id) : null;
                  const teacher = entry ? getTeacher(entry.teacher_id) : null;

                  return (
                    <td key={`${day}-${slot.id}`} className="px-6 py-4 whitespace-nowrap text-sm">
                      {entry && subject && teacher ? (
                        <div className={`rounded-lg p-3 ${subjectColors[subject.category] || 'bg-gray-100 text-gray-800'}`}>
                          <div className="flex items-center mb-1">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span className="font-medium">{subject.name}</span>
                          </div>
                          <div className="flex items-center text-xs opacity-75">
                            <User className="h-3 w-3 mr-1" />
                            <span>{teacher.name}</span>
                          </div>
                          {entry.room_number && (
                            <div className="text-xs opacity-75 mt-1">
                              Room: {entry.room_number}
                            </div>
                          )}
                          <div className="text-xs opacity-75 mt-1">
                            AI Score: {(entry.ai_confidence_score * 100).toFixed(0)}%
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-center py-6">
                          {slot.slot_type === 'break' ? 'Break Time' : 'Free Period'}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}