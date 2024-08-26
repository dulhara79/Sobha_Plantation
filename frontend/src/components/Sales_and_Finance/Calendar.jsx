import { Popover, Calendar } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const CalendarPopover = () => (
  <Popover content={<Calendar fullscreen={false} />} title="Calendar">
    <CalendarOutlined className="text-xl cursor-pointer" />
  </Popover>
);

export default CalendarPopover;