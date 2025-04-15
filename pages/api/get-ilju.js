import { iljuAnimalDB } from '../../lib/iljuAnimalDB';

const gan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ji = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
const ganjiList = Array.from({ length: 60 }, (_, i) => gan[i % 10] + ji[i % 12]);
const baseDate = new Date('1984-01-01');

export default function handler(req, res) {
  const { birth } = req.query;
  if (!birth) return res.status(400).json({ error: 'birth query param missing' });

  const birthDate = new Date(birth);
  const days = Math.floor((birthDate - baseDate) / (1000 * 60 * 60 * 24));
  const index = (days % 60 + 60) % 60;
  const ilju = ganjiList[index];
  const data = iljuAnimalDB[ilju];

  if (!data) return res.status(404).json({ error: 'No match', ilju });

  const matches = data.matches.map((m) => ({
    ...m,
    name: iljuAnimalDB[m.ilju]?.name || ''
  }));

  res.status(200).json({
    ilju,
    ...data,
    matches
  });
}
