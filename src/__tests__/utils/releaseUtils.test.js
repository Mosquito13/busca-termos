import releaseUtils from '../../utils/releaseUtils';

describe('releaseUtils tests', () => {
  describe('parseLastRelease', () => {
    it('should return empty array when releases is not valid', () => {
      expect(releaseUtils.parseLastRelease(null)).toMatchObject([]);
      expect(releaseUtils.parseLastRelease({})).toMatchObject([]);
      expect(releaseUtils.parseLastRelease({ data: [] })).toMatchObject([]);
    });

    it('should return tag name and url when releases is valid', () => {
      const releasesMock = {
        data: [
          {
            tag_name: '2.1.3',
            html_url: 'url/2.1.3'
          },
          {
            tag_name: '2.1.2',
            html_url: 'url/2.1.2'
          }
        ]
      };

      const [tag, url] = releaseUtils.parseLastRelease(releasesMock);

      expect(tag).toBe('2.1.3');
      expect(url).toBe('url/2.1.3');
    });
  });

  describe('hasUpdate', () => {
    it('should validate versions correctly', () => {
      expect(releaseUtils.hasUpdate('1.0.0', null)).toBeFalsy();
      expect(releaseUtils.hasUpdate('1.0.0', '1.0.0')).toBeFalsy();

      expect(releaseUtils.hasUpdate('1.0.0', '1.0.1')).toBeTruthy();
      expect(releaseUtils.hasUpdate('1.0.0', '1.1.0')).toBeTruthy();
      expect(releaseUtils.hasUpdate('1.0.0', '2.0.0')).toBeTruthy();

      expect(releaseUtils.hasUpdate('1.0.1', '1.0.0')).toBeFalsy();
      expect(releaseUtils.hasUpdate('1.1.0', '1.0.0')).toBeFalsy();
      expect(releaseUtils.hasUpdate('2.0.0', '1.0.0')).toBeFalsy();
    });
  });
});
