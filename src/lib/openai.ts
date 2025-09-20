import { TimetableEntry, Subject, Teacher, TimeSlot } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export class AITimetableGenerator {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateTimetable(
    subjects: Subject[],
    teachers: Teacher[],
    timeSlots: TimeSlot[],
    constraints: any
  ): Promise<TimetableEntry[]> {
    const prompt = this.buildNEPCompliantPrompt(subjects, teachers, timeSlots, constraints);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant specialized in creating NEP 2020 compliant school timetables.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return this.parseTimetableResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateFallbackTimetable(subjects, teachers, timeSlots);
    }
  }

  private buildNEPCompliantPrompt(
    subjects: Subject[],
    teachers: Teacher[],
    timeSlots: TimeSlot[],
    constraints: any
  ): string {
    return `
Create a NEP 2020 compliant weekly timetable with the following requirements:

SUBJECTS (with NEP categories):
${subjects.map(s => `- ${s.name} (${s.category}, Priority: ${s.nep_priority}, Multidisciplinary: ${s.multidisciplinary})`).join('\n')}

TEACHERS:
${teachers.map(t => `- ${t.name} (Specialization: ${t.specialization.join(', ')}, NEP Trained: ${t.nep_trained})`).join('\n')}

TIME SLOTS:
${timeSlots.map(t => `- ${t.start_time}-${t.end_time} (${t.slot_type})`).join('\n')}

NEP 2020 COMPLIANCE REQUIREMENTS:
1. Multidisciplinary approach - integrate subjects where possible
2. Holistic development - balance academic and co-curricular activities
3. Flexible curriculum - allow for student choice and creativity
4. Art education integration - ensure creative subjects are well-distributed
5. Physical education - schedule during optimal times
6. Value education - integrate throughout the week
7. Assessment reforms - include time for continuous assessment

CONSTRAINTS:
- Maximum ${constraints.max_periods_per_day} periods per day
- Include ${constraints.break_duration} minute breaks
- Strict NEP compliance: ${constraints.nep_compliance_strict}
- Multidisciplinary sessions: ${constraints.multidisciplinary_sessions}

Please provide a JSON response with the timetable structure including confidence scores for each assignment.
    `;
  }

  private parseTimetableResponse(response: string): TimetableEntry[] {
    try {
      const parsed = JSON.parse(response);
      return parsed.timetable || [];
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return [];
    }
  }

  private generateFallbackTimetable(
    subjects: Subject[],
    teachers: Teacher[],
    timeSlots: TimeSlot[]
  ): TimetableEntry[] {
    // Simple fallback timetable generation logic
    const fallbackEntries: TimetableEntry[] = [];
    let entryId = 1;

    subjects.forEach((subject, index) => {
      const dayOfWeek = (index % 6) + 1; // Distribute across 6 days
      const timeSlot = timeSlots[index % timeSlots.length];
      const teacher = teachers.find(t => 
        t.specialization.some(spec => 
          spec.toLowerCase().includes(subject.name.toLowerCase().split(' ')[0])
        )
      ) || teachers[index % teachers.length];

      fallbackEntries.push({
        id: `fallback-${entryId++}`,
        school_id: 'default-school',
        class_id: 'default-class',
        subject_id: subject.id,
        teacher_id: teacher.id,
        time_slot_id: timeSlot.id,
        day_of_week: dayOfWeek,
        room_number: `Room ${Math.floor(Math.random() * 20) + 1}`,
        ai_confidence_score: 0.7,
        created_at: new Date().toISOString(),
      });
    });

    return fallbackEntries;
  }
}

export const aiGenerator = new AITimetableGenerator(OPENAI_API_KEY || '');