import { Loading, MessageBox } from 'element-ui';
// export const loadingInstance = Loading.service({ fullscreen: true });
// export const loadingInstance = "Loading.service({ fullscreen: true })";

export const HISTORY_DATA_TYPE = { BOOK: '小说', COMIC: '漫画' };
export const TASK_TYPE = {
    BOOK_INSERT: '新增小说',
    BOOK_CHAPTER_UPDATE: "更新小说章节",
    COMIC_INSERT: "新增漫画",
    COMIC_CHAPTER_UPDATE: "更新漫画章节",
    COMIC_MAKE_EPUB: "制作漫画EPUB",
    BOOK_MAKE_EPUB: "制作小说EPUB",
    SEND_TO_KINDLE: "推送至Kindle",
};
export const TASK_STATUS = { WAIT: '等待执行', RUNNING: '执行中', FINISH: '执行结束', FAILD: '执行失败' };

export const BLOCK_TYPE_CHOICES = { BOOK: '小说', COMIC: '漫画' };
export const BLOCK_DESC_CHOICES = { CA: '轮播图', PL: '图片在左', PT: "图片在上" };