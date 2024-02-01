export interface TableDataElement {
    id: number;
    key1: string;
    key2: string;
    key3: string;
    key4: string;
    key5: string;
    key6: string;
    key7: string;
    key8: string;
    key9: string;
    key10: string;
    key11: string;
    key12: string;
    key13: string;
    key14: string;
    key15: string;
    key16: string;
}
const getRandValue = (min: number = 0, max: number = 999999) => Math.round((Math.random() * (max - min + 1)) + min).toString().padStart(6, '0');
const getRandListElement = (index: number, min: number = 0, max: number = 999999) => ({
    id: index.toString().padStart(3, '0'),
    key1: `RAND_DATA: ${getRandValue(min, max)}`,
    key2: `RAND_DATA: ${getRandValue(min, max)}`,
    key3: `RAND_DATA: ${getRandValue(min, max)}`,
    key4: `RAND_DATA: ${getRandValue(min, max)}`,
    key5: `RAND_DATA: ${getRandValue(min, max)}`,
    key6: `RAND_DATA: ${getRandValue(min, max)}`,
    key7: `RAND_DATA: ${getRandValue(min, max)}`,
    key8: `RAND_DATA: ${getRandValue(min, max)}`,
    key9: `RAND_DATA: ${getRandValue(min, max)}`,
    key10: `RAND_DATA: ${getRandValue(min, max)}`,
    key11: `RAND_DATA: ${getRandValue(min, max)}`,
    key12: `RAND_DATA: ${getRandValue(min, max)}`,
    key13: `RAND_DATA: ${getRandValue(min, max)}`,
    key14: `RAND_DATA: ${getRandValue(min, max)}`,
    key15: `RAND_DATA: ${getRandValue(min, max)}`,
    key16: `RAND_DATA: ${getRandValue(min, max)}`
});

export default [...Array(1000)].map((value, index) => getRandListElement(index)) as TableDataElement[];
