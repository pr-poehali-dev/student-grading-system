import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Student {
  id: number;
  name: string;
  phone: string;
  grades: { subject: string; grade: number; date: string }[];
  comments: { text: string; date: string }[];
}

interface Schedule {
  time: string;
  subject: string;
  class: string;
}

interface Homework {
  id: number;
  subject: string;
  class: string;
  task: string;
  dueDate: string;
  status: 'active' | 'completed';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newGrade, setNewGrade] = useState({ subject: '', grade: '' });
  const [newComment, setNewComment] = useState('');
  const [newHomework, setNewHomework] = useState({ subject: '', class: '', task: '', dueDate: '' });
  const [homeworks, setHomeworks] = useState<Homework[]>([
    {
      id: 1,
      subject: 'Математика',
      class: '5А',
      task: 'Учебник стр. 45-47, решить задачи 1-10',
      dueDate: '2026-01-16',
      status: 'active',
    },
    {
      id: 2,
      subject: 'Русский язык',
      class: '5Б',
      task: 'Упражнение 125, выучить правило на стр. 89',
      dueDate: '2026-01-17',
      status: 'active',
    },
    {
      id: 3,
      subject: 'Физика',
      class: '6А',
      task: 'Параграф 12, ответить на вопросы 1-5',
      dueDate: '2026-01-18',
      status: 'active',
    },
  ]);

  const students: Student[] = [
    {
      id: 1,
      name: 'Иванов Петя',
      phone: '+7 (999) 123-45-67',
      grades: [
        { subject: 'Математика', grade: 5, date: '2026-01-15' },
        { subject: 'Русский язык', grade: 4, date: '2026-01-14' },
        { subject: 'Физика', grade: 5, date: '2026-01-13' },
      ],
      comments: [
        { text: 'Активно участвует на уроках', date: '2026-01-15' },
      ],
    },
    {
      id: 2,
      name: 'Смирнова Маша',
      phone: '+7 (999) 234-56-78',
      grades: [
        { subject: 'Математика', grade: 4, date: '2026-01-15' },
        { subject: 'Русский язык', grade: 5, date: '2026-01-14' },
        { subject: 'Литература', grade: 5, date: '2026-01-12' },
      ],
      comments: [],
    },
    {
      id: 3,
      name: 'Козлов Саша',
      phone: '+7 (999) 345-67-89',
      grades: [
        { subject: 'Математика', grade: 3, date: '2026-01-15' },
        { subject: 'Физика', grade: 4, date: '2026-01-13' },
      ],
      comments: [
        { text: 'Нужно подтянуть знания по математике', date: '2026-01-15' },
      ],
    },
  ];

  const todaySchedule: Schedule[] = [
    { time: '08:30', subject: 'Математика', class: '5А' },
    { time: '09:30', subject: 'Русский язык', class: '5Б' },
    { time: '10:30', subject: 'Физика', class: '6А' },
    { time: '11:30', subject: 'Математика', class: '6Б' },
    { time: '12:30', subject: 'Литература', class: '5А' },
  ];

  const stats = {
    totalStudents: students.length,
    avgGrade: (
      students.reduce((sum, s) => sum + s.grades.reduce((gSum, g) => gSum + g.grade, 0) / s.grades.length, 0) /
      students.length
    ).toFixed(1),
    recentComments: students.reduce((sum, s) => sum + s.comments.length, 0),
    todayLessons: todaySchedule.length,
  };

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-success text-white';
    if (grade === 4) return 'bg-info text-white';
    if (grade === 3) return 'bg-warning text-white';
    return 'bg-destructive text-white';
  };

  const addGrade = () => {
    if (selectedStudent && newGrade.subject && newGrade.grade) {
      console.log('Добавлена оценка:', newGrade);
      setNewGrade({ subject: '', grade: '' });
    }
  };

  const addComment = () => {
    if (selectedStudent && newComment) {
      console.log('Добавлен комментарий:', newComment);
      setNewComment('');
    }
  };

  const addHomework = () => {
    if (newHomework.subject && newHomework.class && newHomework.task && newHomework.dueDate) {
      const homework: Homework = {
        id: Date.now(),
        subject: newHomework.subject,
        class: newHomework.class,
        task: newHomework.task,
        dueDate: newHomework.dueDate,
        status: 'active',
      };
      setHomeworks([...homeworks, homework]);
      setNewHomework({ subject: '', class: '', task: '', dueDate: '' });
    }
  };

  const toggleHomeworkStatus = (id: number) => {
    setHomeworks(
      homeworks.map((hw) =>
        hw.id === id ? { ...hw, status: hw.status === 'active' ? 'completed' : 'active' } : hw
      )
    );
  };

  const deleteHomework = (id: number) => {
    setHomeworks(homeworks.filter((hw) => hw.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Школьный журнал</h1>
                <p className="text-sm text-muted-foreground">Личный кабинет учителя</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-white">УЧ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm p-1 rounded-xl">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="gap-2">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Журнал</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="gap-2">
              <Icon name="BookMarked" size={18} />
              <span className="hidden sm:inline">Д/З</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Icon name="Users" size={18} />
              <span className="hidden sm:inline">Ученики</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Users" size={18} className="text-primary" />
                    Всего учеников
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.totalStudents}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="TrendingUp" size={18} className="text-info" />
                    Средний балл
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-info">{stats.avgGrade}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="MessageSquare" size={18} className="text-warning" />
                    Замечаний
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">{stats.recentComments}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Clock" size={18} className="text-destructive" />
                    Уроков сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-destructive">{stats.todayLessons}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" size={20} />
                    Расписание на сегодня
                  </CardTitle>
                  <CardDescription>Среда, 15 января 2026</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {todaySchedule.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{lesson.time}</span>
                        </div>
                        <div>
                          <p className="font-medium">{lesson.subject}</p>
                          <p className="text-sm text-muted-foreground">Класс {lesson.class}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Star" size={20} />
                    Последние оценки
                  </CardTitle>
                  <CardDescription>Выставленные сегодня</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {students
                    .flatMap((s) =>
                      s.grades
                        .filter((g) => g.date === '2026-01-15')
                        .map((g) => ({ ...g, studentName: s.name }))
                    )
                    .map((grade, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {grade.studentName.split(' ')[1][0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{grade.studentName}</p>
                            <p className="text-sm text-muted-foreground">{grade.subject}</p>
                          </div>
                        </div>
                        <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="journal" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" size={20} />
                  Выставление оценок и замечаний
                </CardTitle>
                <CardDescription>Выберите ученика для добавления оценки или комментария</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {students.map((student) => (
                    <Button
                      key={student.id}
                      variant={selectedStudent?.id === student.id ? 'default' : 'outline'}
                      className="h-auto py-3 justify-start gap-3"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {student.name.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-left">{student.name}</span>
                    </Button>
                  ))}
                </div>

                {selectedStudent && (
                  <div className="space-y-6 p-6 bg-muted/30 rounded-xl animate-scale-in">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Icon name="Plus" size={18} />
                        Добавить оценку
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Предмет"
                          value={newGrade.subject}
                          onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Оценка (2-5)"
                          min="2"
                          max="5"
                          value={newGrade.grade}
                          onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
                        />
                        <Button onClick={addGrade} className="gap-2">
                          <Icon name="Check" size={18} />
                          Добавить
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Icon name="MessageSquare" size={18} />
                        Добавить замечание
                      </h3>
                      <div className="flex gap-3">
                        <Textarea
                          placeholder="Текст замечания..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={addComment} className="gap-2">
                          <Icon name="Send" size={18} />
                          Отправить
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Icon name="History" size={18} />
                        История оценок
                      </h3>
                      <div className="space-y-2">
                        {selectedStudent.grades.map((grade, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-white rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{grade.subject}</p>
                              <p className="text-sm text-muted-foreground">{grade.date}</p>
                            </div>
                            <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookMarked" size={20} />
                  Домашние задания
                </CardTitle>
                <CardDescription>Добавляйте и управляйте домашними заданиями для классов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-xl space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить домашнее задание
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Предмет"
                      value={newHomework.subject}
                      onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                    />
                    <Input
                      placeholder="Класс (например, 5А)"
                      value={newHomework.class}
                      onChange={(e) => setNewHomework({ ...newHomework, class: e.target.value })}
                    />
                  </div>
                  <Textarea
                    placeholder="Описание задания..."
                    value={newHomework.task}
                    onChange={(e) => setNewHomework({ ...newHomework, task: e.target.value })}
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <Input
                      type="date"
                      value={newHomework.dueDate}
                      onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                      className="flex-1"
                    />
                    <Button onClick={addHomework} className="gap-2">
                      <Icon name="Check" size={18} />
                      Добавить задание
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Icon name="List" size={18} />
                    Текущие задания
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {homeworks
                      .filter((hw) => hw.status === 'active')
                      .map((hw) => (
                        <Card key={hw.id} className="border-l-4 border-l-primary animate-scale-in">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary">{hw.class}</Badge>
                                  <Badge variant="outline">{hw.subject}</Badge>
                                </div>
                                <CardTitle className="text-base">{hw.task}</CardTitle>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toggleHomeworkStatus(hw.id)}
                                  title="Отметить выполненным"
                                >
                                  <Icon name="CheckCircle2" size={18} className="text-success" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteHomework(hw.id)}
                                  title="Удалить"
                                >
                                  <Icon name="Trash2" size={18} className="text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="Calendar" size={14} />
                              <span>Срок: {new Date(hw.dueDate).toLocaleDateString('ru-RU')}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>

                  {homeworks.filter((hw) => hw.status === 'completed').length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mt-6">
                        <Icon name="CheckCircle2" size={18} className="text-success" />
                        Выполненные задания
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {homeworks
                          .filter((hw) => hw.status === 'completed')
                          .map((hw) => (
                            <Card key={hw.id} className="border-l-4 border-l-success opacity-60">
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge variant="secondary">{hw.class}</Badge>
                                      <Badge variant="outline">{hw.subject}</Badge>
                                    </div>
                                    <CardTitle className="text-base line-through">{hw.task}</CardTitle>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => toggleHomeworkStatus(hw.id)}
                                      title="Вернуть в активные"
                                    >
                                      <Icon name="RotateCcw" size={18} />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => deleteHomework(hw.id)}
                                      title="Удалить"
                                    >
                                      <Icon name="Trash2" size={18} className="text-destructive" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <Card key={student.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/20 text-primary text-lg font-semibold">
                          {student.name.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{student.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-xs">
                          <Icon name="Phone" size={12} />
                          {student.phone}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Icon name="Award" size={14} />
                        Последние оценки
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {student.grades.slice(0, 5).map((grade, idx) => (
                          <Badge key={idx} className={getGradeColor(grade.grade)} variant="secondary">
                            {grade.subject.substring(0, 3)}: {grade.grade}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Icon name="MessageCircle" size={14} />
                        Замечания: {student.comments.length}
                      </p>
                      {student.comments.length > 0 && (
                        <p className="text-xs text-muted-foreground">{student.comments[0].text}</p>
                      )}
                    </div>
                    <Button variant="outline" className="w-full gap-2" size="sm">
                      <Icon name="Eye" size={16} />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Расписание уроков на неделю
                </CardTitle>
                <CardDescription>15 - 19 января 2026</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'].map((day, dayIdx) => (
                    <div key={dayIdx}>
                      <h3 className="font-semibold mb-3 text-primary">{day}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {todaySchedule.slice(0, dayIdx + 2).map((lesson, lessonIdx) => (
                          <div
                            key={lessonIdx}
                            className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-primary">{lesson.time}</span>
                              <Badge variant="outline">{lesson.class}</Badge>
                            </div>
                            <p className="font-medium">{lesson.subject}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
